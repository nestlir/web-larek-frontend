import { IEvents } from "./events";

/**
 * Гарда для проверки на модель
 * 
 * @param obj Объект, который нужно проверить на модель
 * @returns Результат проверки
 */
export const isModel = (obj: unknown): obj is Model<any> => {
    return obj instanceof Model;
}

/**
 * Базовая модель, чтобы можно было отличить ее от простых объектов с данными
 * 
 * @template T Тип данных модели
 */
export abstract class Model<T> {
    /**
     * Конструктор модели
     * 
     * @param data Данные для инициализации модели
     * @param events Экземпляр инстанса событий
     */
    constructor(data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    }

    /**
     * Сообщить всем что модель поменялась
     * 
     * @param event Имя события
     * @param payload Данные, которые нужно передать в событие
     */
    emitChanges(event: string, payload?: object) {
        // Состав данных можно модифицировать
        this.events.emit(event, payload ?? {});
    }
}
