import { ensureElement } from "../../core/utils/utils";
import { Component } from "../../core/base/BaseComponent";
import { IEvents } from "../../core/base/EventManager";

// Интерфейс состояния формы
interface IFormState {
    valid: boolean;
    errors: string[];
}

// Класс Form, расширяющий базовый класс Component и представляющий форму с управлением состоянием и событиями
export class Form<T> extends Component<IFormState> {
    protected _submit: HTMLButtonElement; // Кнопка отправки формы
    protected _errors: HTMLElement; // Элемент для отображения ошибок

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        // Находим кнопку отправки и элемент для ошибок в контейнере формы
        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        // Добавляем обработчик событий ввода в поля формы
        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });

        // Добавляем обработчик событий отправки формы
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault(); // Предотвращаем стандартное поведение формы
            this.events.emit(`${this.container.name}:submit`); // Инициируем событие отправки формы
        });
    }

    // Обработчик изменений ввода в поля формы
    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value
        });
    }

    // Устанавливаем валидность формы и включаем/отключаем кнопку отправки
    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    // Устанавливаем ошибки и обновляем их отображение
    set errors(value: string) {
        this.setText(this._errors, value);
    }

    // Рендерим состояние формы и обновляем её элементы
    render(state: Partial<T> & IFormState) {
        const { valid, errors, ...inputs } = state;
        super.render({ valid, errors });
        Object.assign(this, inputs);
        return this.container;
    }
}
