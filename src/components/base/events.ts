/**
 * Модуль, содержащий определения типов и интерфейсов связанных с системой событий
 */

// Хорошая практика даже простые типы выносить в алиасы
// Зато когда захотите поменять это достаточно сделать в одном месте
/**
 * Тип для представления имени события
 */
export type EventName = string | RegExp;
/**
 * Тип для представления обработчика события
 */
export type Subscriber = (event: unknown) => void;
/**
 * Тип для представления события, передаваемого в эмиттере
 */
export type EmitterEvent = {
    /**
     *Имя события
     */
    eventName: string,
    /**
     *Данные, которые сопровождают событие
     */
    data: unknown
};

/**
 * Интерфейс, описывающий API эмиттера событий
 */
export interface IEvents {
    /**
     * Установить обработчик на событие
     * @param event Имя события
     * @param callback Функция обработчик
     */
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    /**
     * Инициировать событие с данными
     * @param eventName Имя события
     * @param data Данные, которые сопровождают событие
     */
    emit<T extends object>(eventName: string, data?: T): void;
    /**
     * Сделать коллбек триггер, генерирующий событие при вызове
     * @param eventName Имя события
     * @param context Данные, которые сопровождают событие
     * @returns Функция триггер
     */
    trigger<T extends object>(eventName: string, context?: Partial<T>): (data: T) => void;
}

/**
 * Брокер событий, классическая реализация
 * В расширенных вариантах есть возможность подписаться на все события
 * или слушать события по шаблону например
 */
export class EventEmitter implements IEvents {
    /**
     * Мап содержащий обработчики для каждого события
     */
    private _events: Map<EventName, Set<Subscriber>>;

    /**
     * Создает новый экземпляр класса
     */
    constructor() {
        this._events = new Map<EventName, Set<Subscriber>>();
    }

    /**
     * Установить обработчик на событие
     * @param eventName Имя события
     * @param callback Функция обработчик
     */
    on<T extends object>(eventName: EventName, callback: (event: T) => void) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set<Subscriber>());
        }
        this._events.get(eventName)!.add(callback);
    }

    /**
     * Снять обработчик с события
     * @param eventName Имя события
     * @param callback Функция обработчик
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
     * @param data Данные, которые сопровождают событие
     */
    emit<T extends object>(eventName: string, data?: T) {
        this._events.forEach((subscribers, name) => {
            if (name instanceof RegExp && name.test(eventName) || name === eventName) {
                subscribers.forEach(callback => callback(data));
            }
        });
    }

    /**
     * Слушать все события
     * @param callback Функция обработчик
     */
    onAll(callback: (event: EmitterEvent) => void) {
        this.on("*", callback);
    }

    /**
     * Сбросить все обработчики
     */
    offAll() {
        this._events = new Map<string, Set<Subscriber>>();
    }

    /**
     * Сделать коллбек триггер, генерирующий событие при вызове
     * @param eventName Имя события
     * @param context Данные, которые сопровождают событие
     * @returns Функция триггер
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


