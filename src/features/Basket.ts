import { ensureElement, createElement } from "../core/utils/utils";
import { Component } from "../core/base/BaseComponent";
import { EventEmitter } from "../core/base/EventManager";

// Интерфейс представления корзины
export interface IBasketView {
  items: HTMLElement[];
  total: number;
}

// Класс Basket, представляющий корзину и наследующий базовый класс Component
export class Basket extends Component<IBasketView> {
  protected _list: HTMLElement;  // Элемент списка товаров в корзине
  protected _total: HTMLElement;  // Элемент отображения общей
  protected _button: HTMLElement; // Кнопка для оформления заказа

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

  // Отключение кнопки оформления заказа
  disableButton(value: string) {
    this._button.setAttribute('disabled', value);
  }

  // Установка списка товаров в корзине
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

  // Установка общей суммы товаров в корзине
  set total(total: number) {
    this.setText(this._total, `${total.toString()} синапсов`);
  }
}
