// Интерфейс состояния приложения
export interface IAppState {
  basket: IProduct[] | null; // Текущая корзина
  catalog: IProduct[]; // Каталог продуктов
  loading: boolean; // Состояние загрузки данных
  order: IOrder | null; // Текущий заказ
  preview: string | null; // ID выбранного продукта для предпросмотра
}

// Интерфейс карточки товара
export interface ICard {
  button: string; // Текст на кнопке
  category: string; // Категория товара
  description: string; // Описание товара
  id: string; // Уникальный идентификатор
  image: string; // URL изображения товара
  price: number | null; // Цена товара (может быть null)
  selected: boolean; // Выбран ли товар
  title: string; // Название товара
}

// Интерфейс страницы
export interface IPage {
  counter: number; // Счетчик товаров в корзине
  locked: boolean; // Заблокировано ли скроллирование страницы
  store: HTMLElement[]; // Элементы страницы
}

// Интерфейс контактов для заказа
export interface IOrderContacts {
  email: string; // Email
  phone: string; // Телефон
}

// Интерфейс формы доставки
export interface IOrderDeliveryForm {
  address: string; // Адрес доставки
  payment: PaymentMethods; // Способ оплаты
}

// Интерфейс ошибок формы заказа
export interface IOrderFormError extends IOrderContacts, IOrderDeliveryForm {}

// Интерфейс заказа
export interface IOrder extends IOrderFormError {
  items: string[]; // Список ID товаров в заказе
  payment: PaymentMethods; // Способ оплаты
  total: number; // Общая сумма заказа
}

// Интерфейс продукта
export interface IProduct {
  category: string; // Категория продукта
  description: string; // Описание продукта
  id: string; // Уникальный идентификатор
  image: string; // URL изображения
  price: number | null; // Цена продукта (может быть null)
  title: string; // Название продукта
}

// Интерфейс успешного заказа
export interface IOrderSuccess {
  id: string; // Уникальный идентификатор заказа
  total: number; // Общая сумма заказа
}

// Тип ошибок формы
export type FormError = Partial<Record<keyof IOrder, string>>;

// Типы оплаты
export type PaymentMethods = 'card' | 'cash' | '';

// Типы категорий продуктов
export type CategoryType = 'доп' | 'другое' | 'кнопка' | 'хард-скилл' | 'софт-скилл';

