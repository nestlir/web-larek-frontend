import { Model } from "./base/Model";
import { IAppState, IProduct, IOrder, FormError, IOrderContacts, PaymentMethods } from "../types";

// Событие изменения каталога
export type CatalogChangeEvent = {
  catalog: Product[];
}

// Класс для представления продукта
export class Product extends Model<IProduct> implements IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

// Класс для управления состоянием приложения
export class AppState extends Model<IAppState> {
  catalog: IProduct[]; // Каталог продуктов
  basket: IProduct[] = []; // Товары в корзине
  order: IOrder = { // Текущий заказ
    payment: "card",
    items: [],
    total: 0,
    email: "",
    phone: "",
    address: ""
  }
  preview: string | null; // ID выбранного продукта для предпросмотра
  formErrors: FormError = {}; // Ошибки формы

  // Обновление корзины
  updateBasket() {
    this.emitChanges('counter:changed', this.basket);
    this.emitChanges('basket:changed', this.basket);
  }

  // Очистка корзины
  clearBasket() {
    this.basket = [];
    this.updateBasket();
  }

  // Очистка заказа
  clearOrder() {
    this.order = {
      payment: "card",
      items: [],
      total: 0,
      email: "",
      phone: "",
      address: ""
    }
  }

  // Установка каталога
  setCatalog(items: IProduct[]) {
    this.catalog = items.map(item => new Product(item, this.events))
    this.emitChanges('items:changed', { catalog: this.catalog })
  }

  // Установка предпросмотра товара
  setPreview(item: Product) {
    this.preview = item.id;
    this.emitChanges('preview:changed', item)
  }

  // Получение товаров в заказе
  getOrderProducts(): IProduct[] {
		return this.basket;
	}

  // Проверка, есть ли товар в заказе
  productOrder(item: IProduct): boolean {
    return this.basket.includes(item);
  }

  // Добавление товара в корзину
  addToBasket(item: Product) {
    if(this.basket.indexOf(item) < 0) {
      this.basket.push(item)
      this.updateBasket();
    }
  }

  // Удаление товара из корзины
  removeFromBasket(id: string) {
    this.basket = this.basket.filter((it) => it.id != id)
    this.emitChanges('basket:changed');
  }

  // Получение общей стоимости заказа
  getTotal(): number {
    return this.order.items.reduce((total, item) => total + this.catalog.find(it => it.id === item).price, 0)
  }

  // Установка способа оплаты
  setPaymentMethod(method: string) {
    this.order.payment = method as PaymentMethods;
    this.validateDelivery();
  }

  // Установка поля адреса доставки
  setOrderDeliveryField(value: string) {
    this.order.address = value;
    this.validateDelivery();
  };

  // Установка поля контактов
  setOrderContactField(field: keyof IOrderContacts, value: string) {
    this.order[field] = value;
    this.validateContact();
  }

  // Валидация формы доставки
  validateDelivery() {
    const errors: typeof this.formErrors = {};
    if(!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты'
		}
    if(!this.order.address) {
      errors.address = 'Необходимо указать адрес'
    }
    this.formErrors = errors;
    this.events.emit('deliveryFormError:change', this.formErrors)
    return Object.keys(errors).length === 0
  }

  // Валидация формы контактов
  validateContact() {
    const errors: typeof this.formErrors = {};
    if(!this.order.email) {
      errors.email = 'Необходимо указать email'
    }
    if(!this.order.phone) {
      errors.phone = 'Необходимо указать телефон'
    }
    this.formErrors = errors;
    this.events.emit('contactFormError:change', this.formErrors)
    return Object.keys(errors).length === 0
  }
}
