import { ensureElement } from "../../utils/utils"; // Импорт функции ensureElement из утилитарного модуля
import { Component } from "../base/component"; // Импорт базового компонента
import { IEvents } from "../base/events"; // Импорт интерфейса событий
import { IFormState } from "../../types"; // Импорт интерфейса состояния формы

/**
 * Класс формы, который отвечает за отрисовку формы и обработку событий.
 * @template T - тип данных, который будет использоваться для отображения формы.
 */
export class Form<T> extends Component<IFormState> {
    protected _submit: HTMLButtonElement; // Кнопка подтверждения формы
    protected _errors: HTMLElement; // Элемент, в котором отображаются ошибки

    /**
     * Конструктор формы.
     * @param container - элемент, в котором будет отображаться форма
     * @param events - объект, который содержит функции обработчиков событий
     */
    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container); // Вызов конструктора базового компонента

        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container); // Получение кнопки подтверждения формы
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container); // Получение элемента для отображения ошибок

        // Добавление обработчика события input
        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement; // Получение элемента, вызвавшего событие
            const field = target.name as keyof T; // Получение имени поля
            const value = target.value; // Получение значения поля
            this.onInputChange(field, value); // Вызов функции, которая будет эмитировать событие с новым значением
        });

        // Добавление обработчика события submit
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault(); // Отмена стандартного действия браузера
            this.events.emit(`${this.container.name}:submit`); // Эмитирование события submit с именем формы
        });
    }

    /**
     * Функция, вызываемая при изменении значения поля формы.
     * @param field - имя поля формы
     * @param value - новое значение поля
     */
    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value
        });
    }

    /**
     * Установка состояния валидности формы.
     * @param value - новое состояние валидности формы
     */
    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    /**
     * Установка ошибок формы.
     * @param value - новый массив строк с ошибками
     */
    set errors(value: string[]) {
        this.setText(this._errors, value); // Установка текста ошибок в элементе
    }

    /**
     * Отрисовка формы с заданным состоянием.
     * @param state - объект, содержащий состояние формы
     * @returns элемент, в котором отображается форма
     */
    render(state: Partial<T> & IFormState) {
        const {valid, errors, ...inputs} = state; // Деструктуризация объекта state
        super.render({valid, errors}); // Отрисовка формы с заданным состоянием
        Object.assign(this, inputs); // Присвоение значений новым полям формы
        return this.container; // Возвращение элемента, в котором отображается форма
    }
}
