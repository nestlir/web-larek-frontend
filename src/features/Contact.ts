import { IOrderContacts } from "../types";
import { IEvents } from "../core/base/EventManager";
import { Form } from "./forms/Form";

// Класс Contacts, представляющий форму для контактов и наследующий базовый класс Form
export class Contacts extends Form<IOrderContacts> {
  protected _phoneInput: HTMLInputElement; // Поле ввода телефона
  protected _emailInput: HTMLInputElement; // Поле ввода email

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    // Находим поля ввода телефона и email в контейнере формы
    this._phoneInput = this.container.elements.namedItem('phone') as HTMLInputElement;
    this._emailInput = this.container.elements.namedItem('email') as HTMLInputElement;
  }

  // Установка значения телефона
  set phone(value: string) {
    this._phoneInput.value = value;
  }

  // Установка значения email
  set email(value: string) {
    this._emailInput.value = value;
  }
}
