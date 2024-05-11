// Импорт необходимых зависимостей
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

// Интерфейс для данных компонента Success
interface ISuccess {
  total: number; // Общая сумма заказа
}

// Интерфейс для действий компонента Success
interface ISuccessActions {
  onClick: () => void; // Обработчик клика по кнопке закрытия
}

// Класс компонента Success, наследующийся от базового компонента Component
export class Success extends Component<ISuccess> {
  protected _close: HTMLElement; // Элемент кнопки закрытия
  protected _total: HTMLElement; // Элемент отображения общей суммы заказа

  // Конструктор класса
  constructor(container: HTMLElement, actions: ISuccessActions) {
    super(container);

    // Получение элементов и установка обработчика события клика
    this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
    this._total = ensureElement<HTMLElement>('.order-success__description', this.container);

    if(actions?.onClick) {
      this._close.addEventListener('click', actions.onClick);
    }
  }

  // Установка общей суммы заказа
  set total(total: string) {
    this.setText(this._total, `Списано ${total} синапсов`);
  }
}
