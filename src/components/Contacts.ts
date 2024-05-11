// Импорт интерфейса контактов заказа
import { IOrderContacts } from "../types";
// Импорт интерфейса событий
import { IEvents } from "./base/events";
// Импорт базового класса для формы
import { Form } from "./common/Form";

// Класс контактов, наследуемый от формы
export class Contacts extends Form<IOrderContacts> {
  protected _phoneInput: HTMLInputElement; // Поле ввода телефона
  protected _emailInput: HTMLInputElement; // Поле ввода электронной почты

  // Конструктор
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events); // Вызов конструктора родительского класса
    // Инициализация полей ввода
    this._phoneInput = this.container.elements.namedItem('phone') as HTMLInputElement;
    this._emailInput = this.container.elements.namedItem('email') as HTMLInputElement;
  }

  // Установка значения телефона
  set phone(value: string) {
    this._phoneInput.value = value;
  };

  // Установка значения электронной почты
  set email(value: string) {
    this._emailInput.value = value;
  };
}
