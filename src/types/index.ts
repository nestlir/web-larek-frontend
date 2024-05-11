// Типы оплаты
export type PaymentMethods = 'card' | 'cash' | '';

// Типы категорий продуктов
export type CategoryType = 'софт-скилл' | 'хард-скилл' | 'другое' | 'кнопка' | 'доп';

// Интерфейс продукта
export interface IProduct {
  id: string; // Уникальный идентификатор
  description: string; // Описание продукта
  image: string; // URL изображения
  title: string; // Название продукта
  category: string; // Категория продукта
  price: number | null; // Цена продукта (может быть null)
}

// Интерфейс состояния приложения
export interface IAppState {
  catalog: IProduct[]; // Каталог продуктов
  order: IOrder | null; // Текущий заказ
  basket: IProduct[] | null; // Текущая корзина
  preview: string | null; // ID выбранного продукта для предпросмотра
  loading: boolean; // Состояние загрузки данных
}

// Интерфейс карточки товара
export interface ICard {
  id: string; // Уникальный идентификатор
  title: string; // Название товара
  category: string; // Категория товара
  description: string; // Описание товара
  image: string; // URL изображения товара
  price: number | null; // Цена товара (может быть null)
  selected: boolean; // Выбран ли товар
  button: string; // Текст на кнопке
}

// Интерфейс страницы
export interface IPage {
  counter: number; // Счетчик товаров в корзине
  store: HTMLElement[]; // Элементы страницы
  locked: boolean; // Заблокировано ли скроллирование страницы
}

// Интерфейс контактов для заказа
export interface IOrderContacts {
  email: string; // Email
  phone: string; // Телефон
}

// Интерфейс формы доставки
export interface IOrderDeliveryForm {
  payment: PaymentMethods; // Способ оплаты
  address: string; // Адрес доставки
}

// Интерфейс ошибок формы заказа
export interface IOrderFormError extends IOrderContacts, IOrderDeliveryForm {}

// Интерфейс заказа
export interface IOrder extends IOrderFormError {
  items: string[]; // Список ID товаров в заказе
  total: number; // Общая сумма заказа
  payment: PaymentMethods; // Способ оплаты
}

// Интерфейс успешного заказа
export interface IOrderSuccess {
  id: string; // Уникальный идентификатор заказа
  total: number; // Общая сумма заказа
}

// Тип ошибок формы
export type FormError = Partial<Record<keyof IOrder, string>>;
