import { IOrderContacts } from "../types";
import { IEvents } from "../core/base/EventManager";
import { Form } from "./forms/Form";

/**
 * Класс Contacts представляет форму для контактов и наследует базовый класс Form.
 */
export class Contacts extends Form<IOrderContacts> {
  protected _phoneInput: HTMLInputElement; // Поле ввода телефона
  protected _emailInput: HTMLInputElement; // Поле ввода email

  /**
   * Конструктор класса Contacts.
   * @param {HTMLFormElement} container - Контейнер, в который будет добавлена форма контактов.
   * @param {IEvents} events - Объект для управления событиями.
   */
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    // Находим поля ввода телефона и email в контейнере формы
    this._phoneInput = this.container.elements.namedItem('phone') as HTMLInputElement;
    this._emailInput = this.container.elements.namedItem('email') as HTMLInputElement;
  }

  /**
   * Установка значения телефона.
   * @param {string} value - Новое значение телефона.
   */
  set phone(value: string) {
    this._phoneInput.value = value;
  }

  /**
   * Установка значения email.
   * @param {string} value - Новое значение email.
   */
  set email(value: string) {
    this._emailInput.value = value;
  }
}
