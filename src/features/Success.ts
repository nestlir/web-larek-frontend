import { ensureElement } from "../core/utils/utils";
import { Component } from "../core/base/BaseComponent";

// Интерфейс для данных успеха
interface ISuccess {
  total: number;
}

// Интерфейс для действий при успехе
interface ISuccessActions {
  onClick: () => void;
}

/**
 * Класс Success представляет сообщение об успешной операции и наследует базовый класс Component.
 */
export class Success extends Component<ISuccess> {
  protected _close: HTMLElement; // Кнопка закрытия сообщения
  protected _total: HTMLElement; // Элемент для отображения общей суммы списания

  /**
   * Конструктор класса Success.
   * @param {HTMLElement} container - Контейнер, в который будет добавлено сообщение.
   * @param {ISuccessActions} actions - Действия, выполняемые при успехе.
   */
  constructor(container: HTMLElement, actions: ISuccessActions) {
    super(container);

    // Находим элементы сообщения в контейнере
    this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
    this._total = ensureElement<HTMLElement>('.order-success__description', this.container);

    // Добавляем обработчик события клика на кнопку закрытия
    if (actions?.onClick) {
      this._close.addEventListener('click', actions.onClick);
    }
  }

  /**
   * Установка общей суммы списания.
   * @param {string} total - Общая сумма списания.
   */
  set total(total: string) {
    this.setText(this._total, `Списано ${total} синапсов`);
  }
}
