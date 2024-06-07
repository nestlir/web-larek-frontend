import './scss/styles.scss';
import { LarekAPI } from "./core/api/LarekAPI";
import { API_URL, CDN_URL } from "./core/utils/constants";
import { EventEmitter } from "./core/base/EventManager";
import { AppState, CatalogChangeEvent, Product } from "./features/AppState";
import { Page } from "./features/Page";
import { cloneTemplate, ensureElement } from "./core/utils/utils";
import { Modal } from "./features/modals/Modal";
import { BasketItem, Card } from './features/Card';
import { Basket } from './features/Basket';
import { Order } from './features/Order';
import { Success } from './features/Success';
import { Contacts } from './features/Contact';
import { IOrderContacts, IOrderDeliveryForm, PaymenthMethods } from './types';

// Инициализация объектов для управления событиями и API
const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Поиск шаблонов в документе
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const deliveryTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Инициализация состояния приложения
const appState = new AppState({}, events);

// Основные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const delivery = new Order(cloneTemplate(deliveryTemplate), events);
const contact = new Contacts(cloneTemplate(contactTemplate), events);

// Обработчик изменения каталога
events.on<CatalogChangeEvent>('items:changed', () => {
  page.catalog = appState.catalog.map(item => {
    const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:select', item)
    });
    return card.render({
      title: item.title,
      image: item.image,
      price: item.price,
      category: item.category,
    });
  });
});

// Обработчик открытия корзины
events.on('basket:open', () => {
  modal.render({
    content: basket.render({})
  });
});

// Обработчик выбора товара
events.on('card:select', (item: Product) => {
  appState.setPreview(item);
});

// Обработчик изменения в корзине и обновления общей стоимости
events.on('basket:changed', () => {
  page.counter = appState.getOrderProducts().length;
  let total = 0;
  basket.items = appState.getOrderProducts().map((item, index) => {
    const card = new BasketItem(cloneTemplate(cardBasketTemplate), index, {
      onClick: () => {
        appState.removeFromBasket(item.id);
        basket.total = appState.getTotal();
      },
    });
    total += item.price;
    return card.render({
      title: item.title,
      price: item.price,
    });
  });
  basket.total = total;
  appState.order.total = total;
});

// Обработчик изменения счетчика товаров в корзине
events.on('counter:changed', () => {
  page.counter = appState.basket.length;
});

// Обработчик добавления продукта в корзину
events.on('product:add', (item: Product) => {
  appState.addToBasket(item);
  modal.close();
});

// Обработчик удаления продукта из корзины
events.on('product:delete', (item: Product) => {
  appState.removeFromBasket(item.id);
});

// Обработчик изменения предпросмотра продукта и добавления в корзину
events.on('preview:changed', (item: Product) => {
  if (item) {
    api.getProduct(item.id).then((res) => {
      item.id = res.id;
      item.category = res.category;
      item.title = res.title;
      item.description = res.description;
      item.image = res.image;
      item.price = res.price;

      const card = new Card('card', cloneTemplate(cardPreviewTemplate), {
        onClick: () => {
          if (appState.productOrder(item)) {
            appState.removeFromBasket(item.id);
            modal.close();
          } else {
            events.emit('product:add', item);
          }
        }
      });
      const buttonTitle: string = appState.productOrder(item) ? 'Убрать из корзины' : 'Купить';
      card.buttonTitle = buttonTitle;
      modal.render({
        content: card.render({
          title: item.title,
          description: item.description,
          image: item.image,
          price: item.price,
          category: item.category,
          button: buttonTitle,
        })
      });
    });
  }
});

// Обработчик открытия модального окна доставки
events.on('order:open', () => {
  appState.setPaymentMethod('');
  delivery.setToggleClassPayment('');
  modal.render({
    content: delivery.render({
      payment: 'cash',
      address: '',
      valid: false,
      errors: [],
    })
  });
  appState.order.items = appState.basket.map((item) => item.id);
});

// Обработчик переключения способов оплаты в доставке
events.on('order.payment:change', (data: { target: PaymenthMethods }) => {
  appState.setPaymentMethod(data.target);
});

// Обработчик изменения поля доставки
events.on('order.address:change', (data: { value: string }) => {
  appState.setOrderDeliveryField(data.value);
});

// Обработчик валидации полей доставки
events.on('deliveryFormError:change', (errors: Partial<IOrderDeliveryForm>) => {
  const { payment, address } = errors;
  delivery.valid = !payment && !address;
  delivery.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
});

// Обработчик открытия модального окна контактов
events.on('order:submit', () => {
  modal.render({
    content: contact.render({
      phone: '',
      email: '',
      valid: false,
      errors: [],
    })
  });
});

// Обработчик изменения полей контактов
events.on(/^contacts\..*:change/, (data: { field: keyof IOrderContacts, value: string }) => {
  appState.setOrderContactField(data.field, data.value);
});

// Обработчик валидации полей контактов
events.on('contactFormError:change', (errors: Partial<IOrderContacts>) => {
  const { email, phone } = errors;
  contact.valid = !email && !phone;
  contact.errors = Object.values({ phone, email }).filter(i => !!i).join('; ');
});

// Обработчик оформления заказа
events.on('contacts:submit', () => {
  api.orderProduct(appState.order)
    .then((result) => {
      appState.clearBasket(); // Очистка корзины
      appState.clearOrder(); // Очистка данных заказа
      const success = new Success(cloneTemplate(successTemplate), {
        onClick: () => {
          modal.close();
        }
      });
      modal.render({
        content: success.render({
          total: result.total,
        })
      });
    })
    .catch(err => {
      console.error(err);
    });
});

// Обработчики открытия и закрытия модального окна
events.on('modal:open', () => {
  page.locked = true; // Блокируем скроллинг страницы
});

events.on('modal:close', () => {
  page.locked = false; // Разблокируем скроллинг страницы
});

// Получение списка продуктов с сервера и обновление состояния приложения
api.getProductList()
  .then(appState.setCatalog.bind(appState))
  .catch(err => {
    console.error(err);
  });
