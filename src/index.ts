// Импорт стилей и необходимых классов
import './scss/styles.scss';
import { LarekAPI } from "./components/LarekApi";
import { API_URL, CDN_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/events";
import { AppState, CatalogChangeEvent, Product } from "./components/AppState";
import { Page } from "./components/Page";
import { cloneTemplate, createElement, ensureElement } from "./utils/utils";
import { Modal } from "./components/common/Modal";
import { BasketItem, Card } from './components/Card';
import { Basket } from './components/Basket';
import { Order } from './components/Order';
import { Success } from './components/Success';
import { Contacts } from './components/Contacts';
import { IOrderContacts, IOrderDeliveryForm } from './types';

// Создание экземпляров необходимых объектов
const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Загрузка шаблонов верстки
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const deliveryTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Инициализация состояния приложения
const appState = new AppState({}, events);

// Создание основных контейнеров
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const delivery = new Order(cloneTemplate(deliveryTemplate), events);
const contact = new Contacts(cloneTemplate(contactTemplate), events);

// Обработчики событий

// Обновление каталога
events.on<CatalogChangeEvent>('items:changed', () => {
  page.catalog = appState.catalog.map(item => {
    const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:select', item)
    });
    return card.render({
      title: item.title,
      image: item.image,
      price: item.price,
      category: item.category
    });
  });
});

// Открытие корзины
events.on('basket:open', () => {
  modal.render({
    content: basket.render({})
  });
});

// Открытие товара
events.on('card:select', (item: Product) => {
  appState.setPreview(item);
});

// Изменение в корзине и общая стоимость корзины
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

// Изменение счетчика товаров в корзине
events.on('counter:changed', () => {
  page.counter = appState.basket.length;
});

// Добавление продукта в корзину
events.on('product:add', (item: Product) => {
  appState.addToBasket(item);
  modal.close();
});

// Удаление продукта из корзины
events.on('product:delete', (item: Product) => {
  appState.removeFromBasket(item.id);
});

// Превью продукта и добавление товара в корзину
events.on('preview:changed', (item: Product) => {
  if (item) {
    api.getProduct(item.id)
      .then((res) => {
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
        console.log('Button title:', buttonTitle);
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

// Открытие модального окна Доставки
events.on('order:open', () => {
  appState.setPaymentMethod('');
  delivery.setToggleClassPayment('');
  modal.render({
    content: delivery.render({
      payment: '',
      address: '',
      valid: false,
      errors: [],
    })
  });
  appState.order.items = appState.basket.map((item) => item.id);
});

// Переключение способов оплаты в доставке
events.on('order.payment:change', (data: { target: string }) => {
  appState.setPaymentMethod(data.target);
});

// Изменение поля доставки
events.on('order.address:change', (data: { value: string }) => {
  appState.setOrderDeliveryField(data.value);
});

// Валидация полей доставки
events.on('deliveryFormError:change', (errors: Partial<IOrderDeliveryForm>) => {
  const { payment, address } = errors;
  delivery.valid = !payment && !address;
  delivery.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
});

// Открытие модального окна контактов
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

// Изменение полей контактов
events.on(/^contacts\..*:change/, (data: { field: keyof IOrderContacts, value: string }) => {
  appState.setOrderContactField(data.field, data.value);
});

// Валидация полей контактов
events.on('contactFormError:change', (errors: Partial<IOrderContacts>) => {
  const { email, phone } = errors;
  contact.valid = !email && !phone;
  contact.errors = Object.values({ phone, email }).filter(i => !!i).join('; ');
});

// Оформление заказа
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

// Открытое модальное окно
events.on('modal:open', () => {
  page.locked = true; // нельзя скролл
});

// Закрытое модальное окно
events.on('modal:close', () => {
  page.locked = false; // Дает скроллить страницу
});

// Получение списка продуктов
api.getProductList()
  .then(appState.setCatalog.bind(appState))
  .catch(err => {
    console.log(err);
  });
