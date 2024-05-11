import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

// Интерфейс страницы
interface IPage {
  counter: number; // Счетчик товаров в корзине
  catalog: HTMLElement[]; // Элементы каталога
  locked: boolean; // Заблокировано ли скроллирование страницы
}

// Класс страницы
export class Page extends Component<IPage> {
  protected _counter: HTMLElement; // Элемент счетчика
  protected _catalog: HTMLElement; // Элемент каталога
  protected _wrapper: HTMLElement; // Элемент обертки
  protected _basket: HTMLElement; // Элемент корзины

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    // Инициализация элементов страницы
    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._catalog = ensureElement<HTMLElement>('.gallery');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._basket = ensureElement<HTMLElement>('.header__basket');

    // Обработчик клика по корзине
    this._basket.addEventListener('click', () => {
      this.events.emit('basket:open');
    })
  }

  // Установка значения счетчика
  set counter(value: number) {
    this.setText(this._counter, String(value));
  }

  // Установка элементов каталога
  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  // Установка состояния блокировки скролла страницы
  set locked(value: boolean) {
    this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
  }
}
