import { ICard } from "../types";
import { ensureElement } from "../core/utils/utils";
import { Component } from "../core/base/BaseComponent";

// Интерфейс действия для карточки
export interface ICardAction {
  onClick: (event: MouseEvent) => void;
}

/**
 * Класс Card представляет карточку товара и наследует базовый класс Component.
 */
export class Card<T> extends Component<ICard> {
  protected _title: HTMLElement;          // Заголовок карточки
  protected _image?: HTMLImageElement;    // Изображение карточки
  protected _category?: HTMLElement;      // Категория карточки
  protected _description?: HTMLElement;   // Описание карточки
  protected _price: HTMLElement;          // Цена карточки
  protected _button?: HTMLButtonElement;  // Кнопка действия карточки
  protected _buttonModal?: HTMLButtonElement;  // Кнопка модального окна (если есть)

  // Сопоставление категорий с ключами для CSS классов
  private categoryKey: Record<string, string> = {
    "софт-скил": "_soft",
    "хард-скил": "_hard",
    кнопка: "_button",
    дополнительное: "_additional",
    другое: "_other"
  };

  /**
   * Конструктор класса Card.
   * @param {string} blockName - Имя блока для поиска элементов.
   * @param {HTMLElement} container - Контейнер, в который будет добавлена карточка.
   * @param {ICardAction} [action] - Действие, выполняемое при клике на карточку.
   */
  constructor(protected blockName: string, container: HTMLElement, action?: ICardAction) {
    super(container);
    
    // Находим элементы карточки в контейнере
    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
    this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
    this._category = container.querySelector(`.${blockName}__category`);
    this._description = container.querySelector(`.${blockName}__description`);
    this._button = container.querySelector(`.${blockName}__button`);

    // Добавляем обработчик события клика для карточки или кнопки
    if (action?.onClick) {
      if (this._button) {
        this._button.addEventListener("click", action.onClick);
      } else {
        container.addEventListener("click", action.onClick);
      }
    }
  }

  /**
   * Отключение кнопки при отсутствии цены.
   * @param {number | null} value - Значение цены.
   */
  priceDisabled(value: number | null) {
    if (!value && this._button) {
      this._button.disabled = true;
    }
  }

  /**
   * Установка идентификатора карточки.
   * @param {string} value - Идентификатор карточки.
   */
  set id(value: string) {
    this.container.dataset.id = value;
  }

  /**
   * Получение идентификатора карточки.
   * @returns {string} - Идентификатор карточки.
   */
  get id(): string {
    return this.container.dataset.id || "";
  }

  /**
   * Установка заголовка карточки.
   * @param {string} value - Заголовок карточки.
   */
  set title(value: string) {
    this.setText(this._title, value);
  }

  /**
   * Получение заголовка карточки.
   * @returns {string} - Заголовок карточки.
   */
  get title(): string {
    return this._title.textContent || "";
  }

  /**
   * Установка текста кнопки.
   * @param {string} value - Текст кнопки.
   */
  set buttonTitle(value: string) {
    if (this._button) {
      this.setText(this._button, value);
    }
  }

  /**
   * Установка изображения карточки.
   * @param {string} value - URL изображения.
   */
  set image(value: string) {
    if (this._image instanceof HTMLImageElement) {
      this._image.src = value;
      this._image.alt = this._title.textContent;
    }
  }

  /**
   * Установка цены карточки.
   * @param {number | null} value - Цена карточки.
   */
  set price(value: number | null) {
    this.setText(this._price, value ? `${value.toString()} синапсов` : 'Бесценно');
    this.priceDisabled(value);
  }

  /**
   * Получение цены карточки.
   * @returns {number} - Цена карточки.
   */
  get price(): number {
    return Number(this._price.textContent || '');
  }

  /**
   * Установка категории карточки.
   * @param {string} value - Категория карточки.
   */
  set category(value: string) {
    this.setText(this._category, value);
    const category = this._category.classList[0];
    this._category.className = '';
    this._category.classList.add(`${category}`);
    this._category.classList.add(`${category}${this.categoryKey[value]}`);
  }

  /**
   * Установка описания карточки.
   * @param {string | string[]} value - Описание карточки.
   */
  set description(value: string | string[]) {
    if (Array.isArray(value)) {
      this._description.replaceWith(...value.map(str => {
        const descTemplate = this._description.cloneNode() as HTMLElement;
        this.setText(descTemplate, str);
        return descTemplate;
      }));
    } else {
      this.setText(this._description, value);
    }
  }
}

// Интерфейс элемента корзины
export interface IBasketItem {
  title: string;
  price: number;
}

/**
 * Класс BasketItem представляет элемент корзины и наследует базовый класс Component.
 */
export class BasketItem extends Component<IBasketItem> {
  protected _index: HTMLElement;  // Индекс элемента в корзине
  protected _title: HTMLElement;  // Заголовок элемента
  protected _price: HTMLElement;  // Цена элемента
  protected _button: HTMLButtonElement;  // Кнопка действия элемента

  /**
   * Конструктор класса BasketItem.
   * @param {HTMLElement} container - Контейнер, в который будет добавлен элемент корзины.
   * @param {number} index - Индекс элемента в корзине.
   * @param {ICardAction} [action] - Действие, выполняемое при клике на элемент корзины.
   */
  constructor(container: HTMLElement, index: number, action?: ICardAction) {
    super(container);

    // Находим элементы индекса, заголовка, цены и кнопки в контейнере элемента корзины
    this._index = ensureElement<HTMLElement>('.basket__item-index', container);
    this.setText(this._index, index + 1);
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._button = container.querySelector('.card__button');
    
    // Добавляем обработчик события клика для кнопки
    if (action?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', (action.onClick));
      }
    }
  }

  /**
   * Установка индекса элемента.
   * @param {number} value - Новый индекс элемента.
   */
  set index(value: number) {
    this.setText(this._index, value);
  }

  /**
   * Установка заголовка элемента.
   * @param {string} value - Новый заголовок элемента.
   */
  set title(value: string) {
    this.setText(this._title, value);
  }

  /**
   * Установка цены элемента.
   * @param {number} value - Новая цена элемента.
   */
  set price(value: number) {
    this.setText(this._price, value);
  }
}
