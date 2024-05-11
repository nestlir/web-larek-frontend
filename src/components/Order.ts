// Импорт необходимых типов и функций
import { IOrderDeliveryForm } from "../types";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";

// Класс, представляющий форму заказа
export class Order extends Form<IOrderDeliveryForm> {
  protected _paymentContainer: HTMLDivElement; // Контейнер для кнопок оплаты
  protected _paymentButton: HTMLButtonElement[]; // Кнопки оплаты
  protected _addressInput: HTMLInputElement; // Поле ввода адреса

  constructor(container: HTMLFormElement, events: IEvents) {
    // Вызов конструктора базового класса
    super(container, events);

    // Инициализация свойств
    this._paymentContainer = ensureElement<HTMLDivElement>('.order__buttons', this.container);
    this._paymentButton = Array.from(this._paymentContainer.querySelectorAll('.button_alt'));
    this._addressInput = this.container.elements.namedItem('address') as HTMLInputElement;

    // Обработчик события клика по кнопкам оплаты
    this._paymentContainer.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLButtonElement;
      this.setToggleClassPayment(target.name);
      events.emit(`order.payment:change`, {target: target.name});
    });
  }

  // Метод для установки активного класса для кнопок оплаты
  setToggleClassPayment(className: string) {
    this._paymentButton.forEach(button => {
      this.toggleClass(button, 'button_alt-active', button.name === className);
    });
  }

  // Сеттер для установки значения поля адреса
  set address(value: string) {
    this._addressInput.value = value;
  }
}
