import { IOrderDeliveryForm } from "../types";
import { ensureElement } from "../core/utils/utils";
import { IEvents } from "../core/base/EventManager";
import { Form } from "./forms/Form";

/**
 * Класс Order представляет форму заказа и наследует базовый класс Form.
 */
export class Order extends Form<IOrderDeliveryForm> {
  protected _paymentContainer: HTMLDivElement; // Контейнер для кнопок выбора метода оплаты
  protected _paymentButton: HTMLButtonElement[]; // Массив кнопок выбора метода оплаты
  protected _addressInput: HTMLInputElement; // Поле ввода адреса

  /**
   * Конструктор класса Order.
   * @param {HTMLFormElement} container - Контейнер, в который будет добавлена форма заказа.
   * @param {IEvents} events - Объект для управления событиями.
   */
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    // Находим элементы формы в контейнере
    this._paymentContainer = ensureElement<HTMLDivElement>('.order__buttons', this.container);
    this._paymentButton = Array.from(this._paymentContainer.querySelectorAll('.button_alt'));
    this._addressInput = this.container.elements.namedItem('address') as HTMLInputElement;

    // Добавляем обработчик событий на контейнер кнопок оплаты
    this._paymentContainer.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLButtonElement;
      this.setToggleClassPayment(target.name);
      events.emit(`order.payment:change`, { target: target.name });
    });
  }

  /**
   * Переключение классов активной кнопки оплаты.
   * @param {string} className - Класс активной кнопки.
   */
  setToggleClassPayment(className: string) {
    this._paymentButton.forEach(button => {
      this.toggleClass(button, 'button_alt-active', button.name === className);
    });
  }

  /**
   * Установка значения адреса.
   * @param {string} value - Новое значение адреса.
   */
  set address(value: string) {
    this._addressInput.value = value;
  }
}
