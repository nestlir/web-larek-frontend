// Типы методов оплаты 
export type PaymenthMethods = 'card' | 'cash';

// Типы категорий
export type CategoryType = 'софт-скилл' | 'хард-скилл' | 'кнопка' | 'другое' | 'доп';

// Интерфейс состояния приложения
export interface IAppState {
  catalog: IProduct[];
  order: IOrder | null;
  basket: IProduct[] | null;
  preview: string | null;
  loading: boolean;
}

// Интерфейс страницы
export interface IPage {
  counter: number;
  store: HTMLElement[];
  locked: boolean;
}

// Интерфейс карточки товара
export interface ICard {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  selected: boolean;
  button: string;
}

// Интерфейс продукта
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Интерфейс контактов заказа
export interface IOrderContacts {
  email: string;
  phone: string;
}

// Интерфейс формы доставки заказа
export interface IOrderDeliveryForm {
  payment: PaymenthMethods;
  address: string;
}

// Интерфейс ошибок формы заказа, объединяющий контакты и доставку
export interface IOrderFormError extends IOrderContacts, IOrderDeliveryForm {}

// Интерфейс заказа, включающий элементы заказа и общую сумму
export interface IOrder extends IOrderFormError {
  items: string[];
  total: number;
}

// Интерфейс успешного заказа
export interface IOrderSuccess {
  id: string;
  total: number;
}

// Интерфейс для API Ларек
export interface ILarekAPI {
  getProductList: () => Promise<IProduct[]>;
  getProduct: (id: string) => Promise<IProduct>;
  orderProduct: (order: IOrder) => Promise<IOrderSuccess>;
}

// Тип ошибок формы
export type FormError = Partial<Record<keyof IOrder, string>>;
