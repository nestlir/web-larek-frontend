import { ensureElement } from "../core/utils/utils";
import { Component } from "../core/base/BaseComponent";
import { IEvents } from "../core/base/EventManager";

// Интерфейс для страницы
interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

/**
 * Класс Page представляет страницу и наследует базовый класс Component.
 */
export class Page extends Component<IPage> {
  protected _counter: HTMLElement; // Элемент для отображения счетчика корзины
  protected _catalog: HTMLElement; // Элемент для отображения каталога
  protected _wrapper: HTMLElement; // Обертка страницы
  protected _basket: HTMLElement; // Элемент корзины

  /**
   * Конструктор класса Page.
   * @param {HTMLElement} container - Контейнер, в который будет добавлен элемент страницы.
   * @param {IEvents} events - Объект для управления событиями.
   */
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    // Находим элементы страницы в контейнере
    this._counter = ensureElement<HTMLElement>('.header__basket-counter', container);
    this._catalog = ensureElement<HTMLElement>('.gallery', container);
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper', container);
    this._basket = ensureElement<HTMLElement>('.header__basket', container);

    // Добавляем обработчик события клика на элемент корзины
    this._basket.addEventListener('click', () => {
      this.events.emit('basket:open'); // Инициируем событие открытия корзины
    });
  }

  /**
   * Установка значения счетчика корзины.
   * @param {number} value - Новое значение счетчика.
   */
  set counter(value: number) {
    this.setText(this._counter, String(value));
  }

  /**
   * Установка каталога товаров.
   * @param {HTMLElement[]} items - Массив элементов каталога.
   */
  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  /**
   * Установка состояния блокировки страницы.
   * @param {boolean} value - Состояние блокировки.
   */
  set locked(value: boolean) {
    this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
  }
}
