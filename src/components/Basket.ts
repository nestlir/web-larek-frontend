// Импорт необходимых функций и классов
import { ensureElement, createElement } from "../utils/utils";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/events";

// Интерфейс представления корзины
export interface IBasketView {
  items: HTMLElement[]; // Элементы корзины
  total: number; // Общая стоимость
}

// Класс компонента "Корзина"
export class Basket extends Component<IBasketView> {
  protected _list: HTMLElement; // Элемент списка товаров в корзине
  protected _total: HTMLElement; // Элемент общей стоимости
  protected _button: HTMLElement; // Элемент кнопки оформления заказа

  // Конструктор класса
  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    // Получение ссылок на элементы корзины
    this._list = ensureElement<HTMLElement>('.basket__list', this.container);
    this._total = this.container.querySelector('.basket__price') as HTMLElement;
    this._button = this.container.querySelector('.basket__button') as HTMLElement;

    // Привязка обработчика события к кнопке оформления заказа
    if (this._button) {
      this._button.addEventListener('click', () => {
        events.emit('order:open'); // Эмитирование события "order:open"
      });
    }
    this.items = []; // Инициализация пустого массива элементов
  }

  // Метод для отключения кнопки оформления заказа
  disableButton(value: string) {
    this._button.setAttribute('disabled', value);
  }

  // Установка списка элементов корзины
  set items(items: HTMLElement[]) {
    if (items.length) {
      this._list.replaceChildren(...items); // Замена текущих элементов на новые
      this.setDisable(this._button, false); // Включение кнопки оформления заказа
    } else {
      this._list.replaceChildren(
        createElement<HTMLParagraphElement>('p', {
          textContent: 'Корзина пуста ¯\_(ツ)_/¯' // Текст "Корзина пуста"
        })
      );
      this.disableButton('true'); // Отключение кнопки оформления заказа
    }
  }

  // Установка общей стоимости заказа
  set total(total: number) {
    this.setText(this._total, `${total.toString()}` + ' синапсов'); // Установка текста с общей стоимостью
  }
}
