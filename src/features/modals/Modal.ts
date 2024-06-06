import { ensureElement } from "../../core/utils/utils";
import { Component } from "../../core/base/BaseComponent";
import { IEvents } from "../../core/base/EventManager";

// Интерфейс данных для модального окна
interface IModalData {
  content: HTMLElement;
}

// Класс Modal, расширяющий базовый класс Component и представляющий модальное окно
export class Modal extends Component<IModalData> {
  protected _closeButton: HTMLButtonElement; // Кнопка закрытия модального окна
  protected _content: HTMLElement; // Контейнер для содержимого модального окна

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    // Находим кнопку закрытия и контейнер содержимого в контейнере модального окна
    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this._content = ensureElement<HTMLElement>('.modal__content', container);

    // Добавляем обработчики событий для закрытия модального окна
    this._closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this._content.addEventListener('click', (event) => event.stopPropagation());
  }

  // Устанавливаем содержимое модального окна
  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  // Открываем модальное окно
  open() {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open'); // Инициируем событие открытия модального окна
  }

  // Закрываем модальное окно
  close(): void {
    this.container.classList.remove('modal_active');
    this.content = null;
    this.events.emit('modal:close'); // Инициируем событие закрытия модального окна
  }

  // Рендерим модальное окно с переданными данными
  render(data: IModalData): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }
}
