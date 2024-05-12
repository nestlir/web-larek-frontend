// Импорт необходимых зависимостей
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { ISuccess, ISuccessActions } from "../../types";


/**
 * Класс компонента Success, наследующийся от базового компонента Component.
 * @extends Component
 */
export class Success extends Component<ISuccess> {
  /**
   * Элемент кнопки закрытия.
   * @type {HTMLElement}
   * @private
   */
  private _close: HTMLElement;

  /**
   * Элемент отображения общей суммы заказа.
   * @type {HTMLElement}
   * @private
   */
  private _total: HTMLElement;

  /**
   * Конструктор класса.
   * @param {HTMLElement} container - элемент контейнера.
   * @param {ISuccessActions} actions - объект действий компонента Success.
   */
  constructor(container: HTMLElement, actions: ISuccessActions) {
    super(container);

    // Получение элементов и установка обработчика события клика
    this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
    this._total = ensureElement<HTMLElement>('.order-success__description', this.container);

    if (actions?.onClick) {
      this._close.addEventListener('click', actions.onClick);
    }
  }

  /**
   * Установка общей суммы заказа.
   * @param {string} total - общей суммы заказа.
   */
  public set total(total: string) {
    this.setText(this._total, `Списано ${total} синапсов`);
  }
}

