import { IEvents } from "./EventManager";

// Функция-гарда для проверки, является ли объект моделью
export const isModel = (obj: unknown): obj is Model<any> => {
    return obj instanceof Model;
}

/**
 * Абстрактный класс Model, представляющий базовую модель данных
 * Отличает модель от простых объектов с данными и предоставляет базовый функционал
 */
export abstract class Model<T> {
    // Конструктор, принимающий частичные данные модели и интерфейс событий
    constructor(data: Partial<T>, protected events: IEvents) {
        // Копирование свойств из объекта данных в экземпляр модели
        Object.assign(this, data);
    }

    /**
     * Сообщить всем подписчикам, что модель изменилась
     * @param event Имя события, которое будет инициировано
     * @param payload (необязательно) Дополнительные данные, передаваемые обработчикам события
     */
    emitChanges(event: string, payload?: object) {
        // Инициировать событие с данными или пустым объектом
        this.events.emit(event, payload ?? {});
    }

    // Общие методы для всех моделей могут быть добавлены здесь
}
