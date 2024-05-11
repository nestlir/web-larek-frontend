// Тип ответа от API, содержащий список элементов указанного типа
export type ApiListResponse<Type> = {
    total: number; // Общее количество элементов
    items: Type[]; // Список элементов
};

// Типы HTTP-методов для запросов POST
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Класс для работы с API
export class Api {
    readonly baseUrl: string; // Базовый URL API
    protected options: RequestInit; // Опции запроса

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        // Установка опций запроса
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    // Обработка ответа от сервера
    protected handleResponse(response: Response): Promise<object> {
        if (response.ok) return response.json(); // Если ответ успешный, вернуть JSON
        else return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText)); // Иначе вернуть ошибку
    }

    // Метод GET для получения данных
    get(uri: string) {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        }).then(this.handleResponse);
    }

    // Метод POST для отправки данных
    post(uri: string, data: object, method: ApiPostMethods = 'POST') {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        }).then(this.handleResponse);
    }
}
