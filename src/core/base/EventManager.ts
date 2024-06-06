// Определение алиасов типов для имен событий и подписчиков
type EventName = string | RegExp;
type Subscriber = Function;
type EmitterEvent = {
    eventName: string,
    data: unknown
};

// Интерфейс для управления событиями
export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

/**
 * EventEmitter - класс для управления событиями
 * Включает в себя методы для добавления, удаления и вызова событий
 */
export class EventEmitter implements IEvents {
    _events: Map<EventName, Set<Subscriber>>;

    constructor() {
        // Инициализация Map для хранения событий и их подписчиков
        this._events = new Map<EventName, Set<Subscriber>>();
    }

    /**
     * Добавить обработчик на событие
     * @param eventName Имя события или регулярное выражение для совпадения
     * @param callback Функция-обработчик, вызываемая при возникновении события
     */
    on<T extends object>(eventName: EventName, callback: (event: T) => void) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set<Subscriber>());
        }
        this._events.get(eventName)?.add(callback);
    }

    /**
     * Удалить обработчик с события
     * @param eventName Имя события или регулярное выражение для совпадения
     * @param callback Функция-обработчик, которая должна быть удалена
     */
    off(eventName: EventName, callback: Subscriber) {
        if (this._events.has(eventName)) {
            this._events.get(eventName)!.delete(callback);
            if (this._events.get(eventName)?.size === 0) {
                this._events.delete(eventName);
            }
        }
    }

    /**
     * Инициировать событие с данными
     * @param eventName Имя события
     * @param data Данные, передаваемые обработчикам
     */
    emit<T extends object>(eventName: string, data?: T) {
        this._events.forEach((subscribers, name) => {
            if ((name instanceof RegExp && name.test(eventName)) || name === eventName) {
                subscribers.forEach(callback => callback(data));
            }
        });
    }

    /**
     * Добавить обработчик для всех событий
     * @param callback Функция-обработчик, вызываемая при возникновении любого события
     */
    onAll(callback: (event: EmitterEvent) => void) {
        this.on("*", callback);
    }

    /**
     * Удалить все обработчики событий
     */
    offAll() {
        this._events = new Map<EventName, Set<Subscriber>>();
    }

    /**
     * Создать триггер, который генерирует событие при вызове
     * @param eventName Имя события
     * @param context Дополнительные данные, передаваемые обработчикам
     * @returns Функция-триггер, генерирующая событие при вызове
     */
    trigger<T extends object>(eventName: string, context?: Partial<T>) {
        return (event: object = {}) => {
            this.emit(eventName, {
                ...(event || {}),
                ...(context || {})
            });
        };
    }
}
