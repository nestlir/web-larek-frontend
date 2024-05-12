# Проектная работа "Веб-ларек"

## 🚀 Описание

**Веб-ларек** -   позволяет пользователям легко просматривать каталог товаров, оформлять заказы и управлять своими покупками. Проект построен с использованием передовых технологий HTML, SCSS, TypeScript и Webpack, чтобы обеспечить вам непревзойденный пользовательский опыт.

## 🏗️ Структура проекта

```
📁 src/
├── 📁 components/  
│   ├── 📁 base/  
│   └── ... 
├── 📄 pages/index.html
├── 📄 types/index.ts
├── 📄 index.ts
├── 📄 styles/styles.scss
├── 📄 utils/constants.ts
└── 📄 utils/utils.ts
```

## 💻 Установка и запуск

```bash
npm install
npm run start
```
или
```bash
yarn
yarn start
```

## 🛠️ Сборка проекта

```bash
npm run build
```
или
```bash
yarn build
```

## 📚 Описание базовых классов и их функций


---

# Базовый код

Этот репозиторий содержит базовый код, включающий модуль для работы с API и реализацию событийной системы. Ниже представлено подробное описание классов, типов и методов.

## API Module

### Класс `Api`

Класс `Api` предоставляет базовую функциональность для взаимодействия с внешним API.

#### Конструктор

```typescript
constructor(baseUrl: string, options: RequestInit = {})
```

Создает новый экземпляр класса `Api`.

- `baseUrl`: Базовый URL API.
- `options`: Опции для запросов.

#### Методы

##### `get(uri: string): Promise<object>`

Отправляет GET-запрос к API.

- `uri`: URI запроса.

##### `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>`

Отправляет POST-запрос к API.

- `uri`: URI запроса.
- `data`: Данные запроса.
- `method`: Метод запроса (`POST`, `PUT`, `DELETE`). По умолчанию `POST`.

#### Типы и интерфейсы

##### Тип `ApiListResponse`

```typescript
type ApiListResponse<Type> = {
    total: number,
    items: Type[]
}
```

Модель ответа от API при получении списка элементов.

- `total`: Общее количество элементов.
- `items`: Массив полученных элементов.

##### Тип `ApiPostMethods`

```typescript
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE'
```

Доступные методы POST.

## Events Module

### Класс `EventEmitter`

Класс `EventEmitter` представляет собой реализацию эмиттера событий.

#### Конструктор

```typescript
constructor()
```

Создает новый экземпляр класса `EventEmitter`.

#### Методы

##### `on(event: EventName, callback: (data: T) => void): void`

Устанавливает обработчик на событие.

- `event`: Имя события.
- `callback`: Функция обработчик.

##### `off(eventName: EventName, callback: Subscriber): void`

Снимает обработчик с события.

- `eventName`: Имя события.
- `callback`: Функция обработчик.

##### `emit(eventName: string, data?: T): void`

Инициирует событие с данными.

- `eventName`: Имя события.
- `data`: Данные, которые сопровождают событие (опционально).

---
---

## Класс `Component`

Абстрактный класс для создания компонентов.

### Конструктор

```typescript
constructor(container: HTMLElement)
```

Создает новый экземпляр класса `Component`.

- `container`: Контейнер для рендера.

### Методы

#### `toggleClass`

```typescript
toggleClass(element: HTMLElement, className: string, force?: boolean): void
```

Переключает классы элемента.

- `element`: Элемент, для которого нужно переключить классы.
- `className`: Имя класса, который нужно переключить.
- `force`: Если указано, то класс будет добавлен или удален независимо от его текущего состояния.

#### `setText`

```typescript
setText(element: HTMLElement, value: unknown): void
```

Обновляет текстовое содержимое элемента.

- `element`: Элемент, для которого нужно обновить текстовое содержимое.
- `value`: Новое значение текстового содержимого.

#### `setDisable`

```typescript
setDisable(element: HTMLElement, state: boolean): void
```

Устанавливает статус блокировки элемента.

- `element`: Элемент, для которого нужно установить статус блокировки.
- `state`: Статус блокировки.

#### `setHidden`

```typescript
setHidden(element: HTMLElement): void
```

Скрывает элемент.

- `element`: Элемент, который нужно скрыть.

#### `setVisible`

```typescript
setVisible(element: HTMLElement): void
```

Показывает элемент.

- `element`: Элемент, который нужно показать.

#### `setImage`

```typescript
setImage(element: HTMLElement, src: string, alt?: string): void
```

Устанавливает изображение.

- `element`: Элемент, для которого нужно установить изображение.
- `src`: Ссылка на изображение.
- `alt`: Альтернативный текст на случай, если отсутствует ссылка на изображение.

#### `render`

```typescript
render(data?: Partial<T>): HTMLElement
```

Возвращает рендер в DOM.

- `data`: Данные, которые нужно обновить перед рендером.

## Класс `Model`

Базовая модель для отличия от простых объектов с данными.

### Конструктор

```typescript
constructor(data: Partial<T>, events: IEvents)
```

Создает новый экземпляр класса `Model`.

- `data`: Данные для инициализации модели.
- `events`: Экземпляр инстанса событий.

### Методы

#### `emitChanges`

```typescript
emitChanges(event: string, payload?: object): void
```

Сообщает всем, что модель изменилась.

- `event`: Имя события.
- `payload`: Данные, которые нужно передать в событие.

## Функция `isModel`

Функция для проверки объекта на модель.

```typescript
isModel(obj: unknown): obj is Model<any>
```

Проверяет, является ли объект моделью.

- `obj`: Объект, который нужно проверить на модель.

---
## Компоненты представления
---

## Класс `Basket`

Компонент "Корзина" отвечает за отображение товаров в корзине и взаимодействие с ними.

### Конструктор

```typescript
constructor(container: HTMLElement, events: EventEmitter)
```

Создает новый экземпляр класса `Basket`.

- `container`: Контейнер для отображения корзины.
- `events`: Экземпляр класса `EventEmitter` для обработки событий.

### Методы

#### `disableButton`

```typescript
disableButton(value: string): void
```

Отключает кнопку оформления заказа.

- `value`: Значение для атрибута `disabled`.

#### `items`

```typescript
items: HTMLElement[]
```

Устанавливает список элементов корзины.

#### `total`

```typescript
total: number
```

Устанавливает общую стоимость заказа.

## Класс `Form`

Компонент "Форма" отвечает за отображение формы и обработку событий.

### Конструктор

```typescript
constructor(container: HTMLFormElement, events: IEvents)
```

Создает новый экземпляр класса `Form`.

- `container`: Форма для отображения и обработки.
- `events`: Экземпляр класса, реализующего интерфейс `IEvents`.

### Методы

#### `onInputChange`

```typescript
protected onInputChange(field: keyof T, value: string): void
```

Вызывается при изменении значения поля формы.

- `field`: Имя поля формы.
- `value`: Новое значение поля.

#### `valid`

```typescript
set valid(value: boolean): void
```

Устанавливает состояние валидности формы.

#### `errors`

```typescript
set errors(value: string[]): void
```

Устанавливает ошибки формы.

#### `render`

```typescript
render(state: Partial<T> & IFormState): HTMLElement
```

Отрисовывает форму с заданным состоянием.

- `state`: Состояние формы.

---
---

## Класс `Modal`

Модальное окно отвечает за отображение контента в модальном окне и управление его состоянием.

### Конструктор

```typescript
constructor(container: HTMLElement, events: IEvents)
```

Создает новый экземпляр класса `Modal`.

- `container`: Контейнер, в котором будет размещено модальное окно.
- `events`: Объект, содержащий функции обработчиков событий.

### Методы

#### `content`

```typescript
set content(value: HTMLElement): void
```

Устанавливает содержимое модального окна.

- `value`: Новое содержимое модального окна.

#### `open`

```typescript
open(): void
```

Открывает модальное окно.

#### `close`

```typescript
close(): void
```

Закрывает модальное окно.

#### `render`

```typescript
render(data: IModalData): HTMLElement
```

Отрисовывает модальное окно с переданными данными.

- `data`: Данные для отображения в модальном окне.

## Класс `Success`

Компонент "Успешное завершение" отображает сообщение об успешном выполнении операции.

### Конструктор

```typescript
constructor(container: HTMLElement, actions: ISuccessActions)
```

Создает новый экземпляр класса `Success`.

- `container`: Элемент контейнера для отображения сообщения.
- `actions`: Объект действий компонента Success.

### Методы

#### `total`

```typescript
set total(total: string): void
```

Устанавливает общую сумму заказа.

- `total`: Общая сумма заказа.

---
---

## Интерфейсы

### `IBasketView`

Интерфейс представления корзины.

```typescript
interface IBasketView {
  /**
   * Элементы корзины.
   */
  items: HTMLElement[];
  
  /**
   * Общая стоимость.
   */
  total: number;
}
```

### `IFormState`

Интерфейс представления состояния формы.

```typescript
interface IFormState {
  /**
   * Поле, указывающее на валидность формы.
   */
  valid: boolean;
  
  /**
   * Поле, содержащее массив строк с ошибками.
   */
  errors: string[];
}
```

### `ISuccess`

Интерфейс для данных компонента Success.

```typescript
interface ISuccess {
  /**
   * Общая сумма заказа.
   */
  total: number;
}
```

### `ISuccessActions`

Интерфейс для действий компонента Success.

```typescript
interface ISuccessActions {
  /**
   * Обработчик клика по кнопке закрытия.
   */
  onClick: () => void;
}
```