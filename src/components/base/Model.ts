import { IEvents } from "./events";

/**
 * Проверка, является ли объект моделью
 * @param obj Объект для проверки
 * @returns Является ли объект моделью
 */
export const isModel = (obj: unknown): obj is Model<any> => {
    return obj instanceof Model;
}

/**
 * Базовая модель, чтобы можно было отличить ее от простых объектов с данными
 */
export abstract class Model<T> {
    /**
     * Конструктор модели
     * @param data Данные для инициализации модели
     * @param events Объект для отправки событий
     */
    constructor(data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    }

    /**
     * Сообщает всем, что модель изменилась
     * @param event Имя события
     * @param payload Дополнительные данные
     */
    emitChanges(event: string, payload?: object) {
        // Состав данных можно модифицировать
        this.events.emit(event, payload ?? {});
    }

    /**
     * Добавьте здесь общие методы для моделей
     */
}
