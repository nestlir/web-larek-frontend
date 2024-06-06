import { ICard } from "../types";
import { ensureElement } from "../core/utils/utils";
import { Component } from "../core/base/BaseComponent";

// Интерфейс действия для карточки
export interface ICardAction {
  onClick: (event: MouseEvent) => void;
}

// Класс Card, представляющий карточку товара и наследующий базовый класс Component
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

  // Отключение кнопки при отсутствии цены
  priceDisabled(value: number | null) {
    if (!value) {
      if (this._button) {
        this._button.disabled = true;
      }
    }
  }

  // Установка идентификатора карточки
  set id(value: string) {
    this.container.dataset.id = value;
  }

  // Получение идентификатора карточки
  get id(): string {
    return this.container.dataset.id || "";
  }

  // Установка заголовка карточки
  set title(value: string) {
    this.setText(this._title, value);
  }

  // Получение заголовка карточки
  get title(): string {
    return this._title.textContent || "";
  }

  // Установка текста кнопки
  set buttonTitle(value: string) {
    if (this._button) {
      this.setText(this._button, value);
    }
  }

  // Установка изображения карточки
  set image(value: string) {
    if (this._image instanceof HTMLImageElement) {
      this._image.src = value;
      this._image.alt = this._title.textContent;
    }
  }

  // Установка цены карточки
  set price(value: number | null) {
    this.setText(this._price, (value) ? `${value.toString()} синапсов` : 'Бесценно');
    this.priceDisabled(value);
  }

  // Получение цены карточки
  get price(): number {
    return Number(this._price.textContent || '');
  }

  // Установка категории карточки
  set category(value: string) {
    this.setText(this._category, value);
    const category = this._category.classList[0];
    this._category.className = '';
    this._category.classList.add(`${category}`);
    this._category.classList.add(`${category}${this.categoryKey[value]}`);
  }

  // Установка описания карточки
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

// Класс BasketItem, представляющий элемент корзины и наследующий базовый класс Component
export class BasketItem extends Component<IBasketItem> {
  protected _index: HTMLElement;  // Индекс элемента в корзине
  protected _title: HTMLElement;  // Заголовок элемента
  protected _price: HTMLElement;  // Цена элемента
  protected _button: HTMLButtonElement;  // Кнопка действия элемента

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

  // Установка индекса элемента
  set index(value: number) {
    this.setText(this._index, value);
  }

  // Установка заголовка элемента
  set title(value: string) {
    this.setText(this._title, value);
  }

  // Установка цены элемента
  set price(value: number) {
    this.setText(this._price, value);
  }
}
