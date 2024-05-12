import { ensureElement } from "../../utils/utils"; // Импорт функции ensureElement из утилитарного модуля
import { Component } from "../base/component"; // Импорт базового компонента
import { IEvents } from "../base/events"; // Импорт интерфейса событий

/**
 * Интерфейс, описывающий данные модального окна.
 */
interface IModalData {
  content: HTMLElement; // Содержимое модального окна
}

/**
 * Класс модального окна.
 */
export class Modal extends Component<IModalData> {
  protected _closeButton!: HTMLButtonElement; // Кнопка закрытия модального окна
  protected _content!: HTMLElement; // Содержимое модального окна

  /**
   * Конструктор класса.
   * @param container - контейнер, в котором будет размещено модальное окно
   * @param events - объект, содержащий функции обработчиков событий
   */
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container); // Вызов конструктора базового компонента
    this.initElements(); // Инициализация элементов модального окна
    this.initListeners(); // Инициализация слушателей событий
  }

  /**
   * Метод инициализации элементов модального окна.
   */
  private initElements() {
    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container); // Получение кнопки закрытия
    this._content = ensureElement<HTMLElement>('.modal__content', this.container); // Получение содержимого модального окна
  }

  /**
   * Метод инициализации слушателей событий.
   */
  private initListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this)); // Слушатель события клика на кнопке закрытия
    this.container.addEventListener('click', this.close.bind(this)); // Слушатель события клика на контейнере модального окна
    this._content.addEventListener('click', (event) => event.stopPropagation()); // Слушатель события клика на содержимом модального окна
  }

  /**
   * Установка содержимого модального окна.
   * @param value - новое содержимое модального окна
   */
  set content(value: HTMLElement) {
    this._content.replaceChildren(value); // Замена содержимого модального окна
  }

  /**
   * Метод открытия модального окна.
   */
  open() {
    this.container.classList.add('modal_active'); // Добавление класса для отображения модального окна
    this.events.emit('modal:open'); // Эмитирование события открытия модального окна
  }

  /**
   * Метод закрытия модального окна.
   */
  close(): void {
    this.container.classList.remove('modal_active'); // Удаление класса для скрытия модального окна
    this.events.emit('modal:close'); // Эмитирование события закрытия модального окна
  }

  /**
   * Метод отрисовки модального окна с переданными данными.
   * @param data - данные для отображения в модальном окне
   * @returns контейнер модального окна
   */
  render(data: IModalData): HTMLElement {
    super.render(data); // Вызов метода рендеринга базового компонента
    return this.container; // Возвращение контейнера модального окна
  }
}
