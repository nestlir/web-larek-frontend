/**
 * Модель ответа от API при получении списка элементов
 */
export type ApiListResponse<Type> = {
    /**
     * Общее количество элементов
     */
    total: number,

    /**
     * Массив полученных элементов
     */
    items: Type[]
};

/**
 * Доступные методы POST
 */
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

/**
 * Абстрактный класс для работы с API
 */
export class Api {
    /**
     * Базовый URL API
     */
    readonly baseUrl: string;

    /**
     * Опции для запросов
     */
    protected options: RequestInit;

    /**
     * Создает новый экземпляр класса Api
     * @param baseUrl - Базовый URL API
     * @param options - Опции для запросов
     */
    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    /**
     * Обработчик ответа от API
     * @param response - Ответ от API
     * @returns Promise с данными ответа
     */
    protected handleResponse(response: Response): Promise<object> {
        if (response.ok) return response.json();
        else return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText));
    }

    /**
     * Отправляет GET-запрос к API
     * @param uri - URI запроса
     * @returns Promise с данными ответа
     */
    get(uri: string) {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        }).then(this.handleResponse);
    }

    /**
     * Отправляет POST-запрос к API
     * @param uri - URI запроса
     * @param data - Данные запроса
     * @param method - Метод запроса
     * @returns Promise с данными ответа
     */
    post(uri: string, data: object, method: ApiPostMethods = 'POST') {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        }).then(this.handleResponse);
    }
}

