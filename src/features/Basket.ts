import { ensureElement, createElement } from "../core/utils/utils";
import { Component } from "../core/base/BaseComponent";
import { EventEmitter } from "../core/base/EventManager";

// Интерфейс представления корзины
export interface IBasketView {
  items: HTMLElement[];
  total: number;
}

/**
 * Класс Basket представляет корзину и наследует базовый класс Component.
 */
export class Basket extends Component<IBasketView> {
  protected _list: HTMLElement;  // Элемент списка товаров в корзине
  protected _total: HTMLElement;  // Элемент отображения общей суммы
  protected _button: HTMLElement; // Кнопка для оформления заказа

  /**
   * Конструктор класса Basket.
   * @param {HTMLElement} container - Контейнер, в который будет добавлена корзина.
   * @param {EventEmitter} events - Объект для управления событиями.
   */
  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    // Находим элементы списка, общей суммы и кнопки в контейнере корзины
    this._list = ensureElement<HTMLElement>('.basket__list', this.container);
    this._total = ensureElement<HTMLElement>('.basket__price', this.container);
    this._button = ensureElement<HTMLElement>('.basket__button', this.container);

    // Добавляем обработчик событий на кнопку оформления заказа
    if (this._button) {
      this._button.addEventListener('click', () => {
        events.emit('order:open'); // Инициируем событие открытия заказа
      });
    }

    // Инициализируем пустой список товаров
    this.items = [];
  }

  /**
   * Отключение кнопки оформления заказа.
   * @param {string} value - Значение атрибута `disabled`.
   */
  disableButton(value: string) {
    this._button.setAttribute('disabled', value);
  }

  /**
   * Установка списка товаров в корзине.
   * @param {HTMLElement[]} items - Массив элементов товаров.
   */
  set items(items: HTMLElement[]) {
    if (items.length) {
      this._list.replaceChildren(...items);
      this.setDisable(this._button, false); // Включаем кнопку, если есть товары
    } else {
      this._list.replaceChildren(
        createElement<HTMLParagraphElement>('p', {
          textContent: 'Если вы видите это сообщение, то корзина действительно пуста как мой кошелёк, скиньте Денег. п.с. МУЖ  -_-'
        })
      );
      this.disableButton('true'); // Отключаем кнопку, если корзина пуста
    }
  }

  /**
   * Установка общей суммы товаров в корзине.
   * @param {number} total - Общая сумма товаров.
   */
  set total(total: number) {
    this.setText(this._total, `${total.toString()} синапсов`);
  }
}
