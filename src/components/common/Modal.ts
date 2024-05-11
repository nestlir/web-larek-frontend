import { ensureElement } from "../../utils/utils"; // Импорт функции для гарантированного получения элемента
import { Component } from "../base/Component"; // Импорт базового класса компонента
import { IEvents } from "../base/events"; // Импорт интерфейса для событий

// Интерфейс данных модального окна
interface IModalData {
  content: HTMLElement; // Контент модального окна
}

// Класс модального окна, наследующий от базового компонента
export class Modal extends Component<IModalData> {
  protected _closeButton: HTMLButtonElement; // Элемент кнопки закрытия модального окна
  protected _content: HTMLElement; // Контент модального окна

  // Конструктор класса
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container); // Вызов конструктора базового класса

    // Инициализация элементов модального окна
    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container); // Получение кнопки закрытия
    this._content = ensureElement<HTMLElement>('.modal__content', container); // Получение контента

    // Обработчик события клика по кнопке закрытия
    this._closeButton.addEventListener('click', this.close.bind(this));
    // Обработчик события клика по области вне модального окна для закрытия
    this.container.addEventListener('click', this.close.bind(this));
    // Обработчик события клика по контенту модального окна, чтобы предотвратить закрытие при клике внутри модального окна
    this._content.addEventListener('click', (event) => event.stopPropagation());
  }

  // Установка контента модального окна
  set content(value: HTMLElement) {
    this._content.replaceChildren(value); // Замена содержимого контента новым значением
  }

  // Метод открытия модального окна
  open() {
    this.container.classList.add('modal_active'); // Добавление класса для отображения модального окна
    this.events.emit('modal:open'); // Генерация события открытия модального окна
  }

  // Метод закрытия модального окна
  close(): void {
    this.container.classList.remove('modal_active'); // Удаление класса для скрытия модального окна
    this.content = null; // Установка контента в null для очистки содержимого
    this.events.emit('modal:close'); // Генерация события закрытия модального окна
  }

  // Метод рендеринга модального окна
  render(data: IModalData): HTMLElement {
    super.render(data); // Вызов метода рендеринга базового класса
    this.open(); // Открытие модального окна после рендеринга
    return this.container; // Возврат контейнера модального окна
  }
}
