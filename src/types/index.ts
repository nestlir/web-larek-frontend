/**
 * Интерфейс представления корзины.
 * @interface IBasketView
 */
export interface IBasketView {
    /**
     * Элементы корзины.
     * @type {HTMLElement[]}
     */
    items: HTMLElement[];
    /**
     * Общая стоимость.
     * @type {number}
     */
    total: number;
}

/**
 * Интерфейс представления состояния формы.
 * @interface IFormState
 */
export interface IFormState {
    /**
     * Поле, указывающее на валидность формы.
     * @type {boolean}
     */
    valid: boolean;
    /**
     * Поле, содержащее массив строк с ошибками.
     * @type {string[]}
     */
    errors: string[];
}

/**
 * Интерфейс для данных компонента Success.
 * @interface ISuccess
 */
export interface ISuccess {
    /**
     * Общая сумма заказа.
     * @type {number}
     */
    total: number;
}

/**
 * Интерфейс для действий компонента Success.
 * @interface ISuccessActions
 */
export interface ISuccessActions {
    /**
     * Обработчик клика по кнопке закрытия.
     * @type {() => void}
     */
    onClick: () => void;
}
