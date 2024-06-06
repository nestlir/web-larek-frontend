import { IEvents } from "../core/base/EventManager";
import { Model } from "../core/base/Model";
import { IAppState, IProduct, IOrder, FormError, IOrderContacts, PaymenthMethods } from "../types";

// Тип события изменения каталога
export type CatalogChangeEvent = {
  catalog: Product[];
}

/**
 * Класс Product представляет продукт и наследует Model.
 */
export class Product extends Model<IProduct> implements IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;

  /**
   * Конструктор класса Product.
   * @param {IProduct} data - Данные продукта.
   * @param {IEvents} events - Объект для управления событиями.
   */
  constructor(data: IProduct, events: IEvents) {
    super(data, events);
    this.id = data.id;
    this.description = data.description;
    this.image = data.image;
    this.title = data.title;
    this.category = data.category;
    this.price = data.price;
  }
}


/**
 * Класс AppState представляет состояние приложения и наследует Model.
 */
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
  };
  preview: string | null = null;
  formErrors: FormError = {};

  /**
   * Обновление корзины и уведомление подписчиков об изменении.
   */
  updateBasket() {
    this.emitChanges('counter:changed', this.basket);
    this.emitChanges('basket:changed', this.basket);
  }

  /**
   * Очистка корзины.
   */
  clearBasket() {
    this.basket = [];
    this.updateBasket();
  }

  /**
   * Очистка заказа.
   */
  clearOrder() {
    this.order = {
      payment: "card",
      items: [],
      total: 0,
      email: "",
      phone: "",
      address: ""
    };
  }

  /**
   * Установка каталога продуктов.
   * @param {IProduct[]} items - Массив продуктов.
   */
  setCatalog(items: IProduct[]) {
    this.catalog = items.map(item => new Product(item, this.events));
    this.emitChanges('items:changed', { catalog: this.catalog });
  }

  /**
   * Установка предпросмотра продукта.
   * @param {Product} item - Продукт для предпросмотра.
   */
  setPreview(item: Product) {
    this.preview = item.id;
    this.emitChanges('preview:changed', item);
  }

  /**
   * Получение продуктов из заказа.
   * @returns {IProduct[]} - Массив продуктов.
   */
  getOrderProducts(): IProduct[] {
    return this.basket;
  }

  /**
   * Проверка, находится ли продукт в заказе.
   * @param {IProduct} item - Продукт для проверки.
   * @returns {boolean} - Результат проверки.
   */
  productOrder(item: IProduct): boolean {
    return this.basket.includes(item);
  }

  /**
   * Добавление продукта в корзину.
   * @param {Product} item - Продукт для добавления.
   */
  addToBasket(item: Product) {
    if (this.basket.indexOf(item) < 0) {
      this.basket.push(item);
      this.updateBasket();
    }
  }

  /**
   * Удаление продукта из корзины по идентификатору.
   * @param {string} id - Идентификатор продукта.
   */
  removeFromBasket(id: string) {
    this.basket = this.basket.filter((it) => it.id !== id);
    this.emitChanges('basket:changed');
  }

  /**
   * Подсчет общей стоимости заказа.
   * @returns {number} - Общая стоимость заказа.
   */
  getTotal(): number {
    return this.order.items.reduce((total, item) => total + this.catalog.find(it => it.id === item).price, 0);
  }

  /**
   * Установка метода оплаты.
   * @param {string} method - Метод оплаты.
   */
  setPaymentMethod(method: string) {
    this.order.payment = method as PaymenthMethods;
    this.validateDelivery();
  }

  /**
   * Установка поля адреса доставки.
   * @param {string} value - Значение адреса.
   */
  setOrderDeliveryField(value: string) {
    this.order.address = value;
    this.validateDelivery();
  }

  /**
   * Установка поля контактов заказа.
   * @param {keyof IOrderContacts} field - Поле контакта.
   * @param {string} value - Значение поля.
   */
  setOrderContactField(field: keyof IOrderContacts, value: string) {
    this.order[field] = value;
    this.validateContact();
  }

  /**
   * Валидация формы доставки.
   * @returns {boolean} - Результат валидации.
   */
  validateDelivery(): boolean {
    const errors: typeof this.formErrors = {};
    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    }
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }
    this.formErrors = errors;
    this.events.emit('deliveryFormError:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  /**
   * Валидация контактной формы.
   * @returns {boolean} - Результат валидации.
   */
  validateContact(): boolean {
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('contactFormError:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }
}
