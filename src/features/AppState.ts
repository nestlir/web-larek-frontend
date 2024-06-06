import { Model } from "../core/base/Model";
import { IAppState, IProduct, IOrder, FormError, IOrderContacts, PaymenthMethods } from "../types";

// Тип события изменения каталога
export type CatalogChangeEvent = {
  catalog: Product[];
}

// Класс Product, представляющий продукт и наследующий Model
export class Product extends Model<IProduct> implements IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

// Класс AppState, представляющий состояние приложения и наследующий Model
export class AppState extends Model<IAppState> {
  catalog: IProduct[];
  basket: IProduct[] = [];
  order: IOrder = {
    payment: "card",
    items: [],
    total: 0,
    email: "",
    phone: "",
    address: ""
  }
  preview: string | null;
  formErrors: FormError = {};

  // Обновление корзины и уведомление подписчиков об изменении
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

  // Установка каталога продуктов
  setCatalog(items: IProduct[]) {
    this.catalog = items.map(item => new Product(item, this.events))
    this.emitChanges('items:changed', { catalog: this.catalog })
  }

  // Установка предпросмотра продукта
  setPreview(item: Product) {
    this.preview = item.id;
    this.emitChanges('preview:changed', item)
  }

  // Получение продуктов из заказа
  getOrderProducts(): IProduct[] {
    return this.basket;
  }

  // Проверка, находится ли продукт в заказе
  productOrder(item: IProduct): boolean {
    return this.basket.includes(item);
  }

  // Добавление продукта в корзину
  addToBasket(item: Product) {
    if (this.basket.indexOf(item) < 0) {
      this.basket.push(item)
      this.updateBasket();
    }
  }

  // Удаление продукта из корзины по идентификатору
  removeFromBasket(id: string) {
    this.basket = this.basket.filter((it) => it.id != id)
    this.emitChanges('basket:changed');
  }

  // Подсчет общей стоимости заказа
  getTotal(): number {
    return this.order.items.reduce((total, item) => total + this.catalog.find(it => it.id === item).price, 0)
  }

  // Установка метода оплаты
  setPaymentMethod(method: string) {
    this.order.payment = method as PaymenthMethods;
    this.validateDelivery();
  }

  // Установка поля адреса доставки
  setOrderDeliveryField(value: string) {
    this.order.address = value;
    this.validateDelivery();
  }

  // Установка поля контактов заказа
  setOrderContactField(field: keyof IOrderContacts, value: string) {
    this.order[field] = value;
    this.validateContact();
  }

  // Валидация формы доставки
  validateDelivery() {
    const errors: typeof this.formErrors = {};
    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты'
    }
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес'
    }
    this.formErrors = errors;
    this.events.emit('deliveryFormError:change', this.formErrors)
    return Object.keys(errors).length === 0
  }

  // Валидация контактной формы
  validateContact() {
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
      errors.email = 'Необходимо указать email'
    }
    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон'
    }
    this.formErrors = errors;
    this.events.emit('contactFormError:change', this.formErrors)
    return Object.keys(errors).length === 0
  }
}
