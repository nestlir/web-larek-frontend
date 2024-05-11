import { ensureElement } from "../../utils/utils"; // Импорт функции ensureElement для гарантированного получения элемента DOM
import { Component } from "../base/Component"; // Импорт базового компонента
import { IEvents } from "../base/events"; // Импорт интерфейса событий

// Интерфейс состояния формы
interface IFormState {
    valid: boolean; // Валидность формы
    errors: string[]; // Ошибки формы
}

// Класс компонента формы
export class Form<T> extends Component<IFormState> {
    protected _submit: HTMLButtonElement; // Кнопка отправки формы
    protected _errors: HTMLElement; // Элемент для вывода ошибок

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container); // Вызов конструктора родительского класса

        // Получение элементов формы
        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        // Обработчик события ввода
        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });

        // Обработчик события отправки формы
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault(); // Предотвращение стандартного поведения отправки формы
            this.events.emit(`${this.container.name}:submit`); // Эмитирование события отправки формы
        });
    }

    // Метод для обработки изменения значения поля формы
    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value
        });
    }

    // Установка состояния валидности формы
    set valid(value: boolean) {
        this._submit.disabled = !value; // Установка атрибута disabled кнопке отправки в зависимости от валидности формы
    }

    // Установка ошибок формы
    set errors(value: string) {
        this.setText(this._errors, value); // Установка текста ошибок в элемент вывода ошибок
    }

    // Метод рендеринга формы
    render(state: Partial<T> & IFormState) {
        const {valid, errors, ...inputs} = state; // Деструктуризация состояния формы
        super.render({valid, errors}); // Вызов метода рендеринга родительского класса для обновления состояния компонента
        Object.assign(this, inputs); // Присвоение значений полей формы
        return this.container; // Возврат контейнера формы
    }
}
