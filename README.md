### Принцип MVP

Model-View-Presenter (MVP) - это архитектурный паттерн, который разделяет ответственность в приложении на три слоя: Model (Модель), View (Представление) и Presenter (Презентер).

- **Model**: Отвечает за данные приложения. Включает в себя бизнес-логику и взаимодействие с источниками данных (например, API).
- **View**: Отвечает за отображение данных и взаимодействие с пользователем. View получает команды от Presenter, чтобы обновить интерфейс.
- **Presenter**: Отвечает за логику взаимодействия между Model и View. Получает данные из Model и передает их View для отображения.

### Взаимодействие слоев в проекте

При выполнении какого-либо функционала в приложении по принципу MVP, Presenter получает данные из Model, преобразует их и передает View для отображения. View инициирует события, на которые реагирует Presenter, обновляя Model и View по мере необходимости.

### Группы классов по слоям MVP

#### Model

Эти классы представляют данные приложения и логику их обработки.

- **ApiCore.ts**: Базовый класс для работы с API.
- **LarekAPI.ts**: Специализированный API класс для приложения "Ларёк".
- **AppState.ts**: Управление состоянием приложения.
- **Model.ts**: Базовая модель данных.

#### View

Эти классы отвечают за отображение данных и взаимодействие с пользователем.

- **Form.ts**: Обработка и валидация форм.
- **Modal.ts**: Базовый класс модальных окон.
- **Page.ts**: Базовый компонент страницы.
- **Basket.ts**: Управление корзиной покупок.
- **Card.ts**: Компонент карточки товара.
- **Contact.ts**: Компонент контактной информации.
- **Order.ts**: Процесс оформления заказа.
- **Success.ts**: Страница успешного оформления заказа.

#### Presenter

Эти классы и объекты управляют взаимодействием между Model и View.

- **EventManager.ts**: Управление событиями.
- **utils.ts**: Вспомогательные утилиты для работы с элементами и данными.
- **index.ts**: Точка входа, инициализирующая приложение и связывающая все компоненты.

### 📂 Структура проекта

```plaintext
src/
    📁common.blocks/
    📁core/
    📁api/
        📄 ApiCore.ts
        📄 LarekAPI.ts
    📁base/
        📄 BaseComponent.ts
        📄 EventManager.ts
        📄 Model.ts
    📁utils/
        📄 constants.ts
        📄 utils.ts
    📁features/
        📁forms/
            📄 Form.ts
        📁modals/
            📄 Modal.ts
    📄 AppState.ts
    📄 Basket.ts
    📄 Card.ts
    📄 Contact.ts
    📄 Order.ts
    📄 Page.ts
    📄 Success.ts
    📁images/
    📁pages/
        📄 index.html
    📁public/
    📁scss/
    📁types/
        📄 index.ts
    📁vendor/
    📄 index.ts
```

### 🛠️ Установка и запуск

```bash
# Установка зависимостей
npm install
# Запуск приложения
npm run start
```

или используйте Yarn:

```bash
# Установка зависимостей
yarn install
# Запуск приложения
yarn start
```

### 📦 Сборка проекта

```bash
npm run build
```

или

```bash
yarn build
```

### 📝 Описание структуры файлов

Проект "Веб-ларек" организован по следующим директориям и файлам. Каждый элемент структуры отвечает за определённые аспекты функциональности и логики приложения.

### 📂 `src/`

Основная директория, содержащая все исходные файлы проекта.

#### 📁 `common.blocks/`

Директория для общих блоков кода, которые можно переиспользовать в разных частях проекта (компоненты, стили, скрипты).

#### 📁 `core/`

Сердце приложения, содержащее базовые компоненты, API и утилиты.

##### **`api/`**: Работа с API

- **`ApiCore.ts`**: Базовый класс для взаимодействия с сервером.
- **`LarekAPI.ts`**: Специализированный API класс для "Ларёка".

##### **`base/`**: Основные компоненты системы

- **`BaseComponent.ts`**: Базовый компонент.
- **`EventManager.ts`**: Управление событиями.
- **`Model.ts`**: Модель данных.

#### 📁 `utils/`

Вспомогательные утилиты и константы.

- **`constants.ts`**: Глобальные константы.
- **`utils.ts`**: Утилиты для общего использования.

#### 📁 `features/`

Функциональные модули приложения.

##### **`forms/`**: Работа с формами

- **`Form.ts`**: Обработка и валидация форм.

##### **`modals/`**: Управление модальными окнами

- **`Modal.ts`**: Базовый класс модальных окон.

#### 📁 `images/`

Директория для хранения изображений.

#### 📁 `pages/`

- **`index.html`**: Главная страница проекта.

#### 📁 `public/`

Файлы, доступные для публичного доступа.

#### 📁 `scss/`

Стили, написанные с использованием SCSS.

#### 📁 `types/`

Типы TypeScript, используемые в проекте.

#### 📁 `vendor/`

Библиотеки и зависимости сторонних разработчиков.

### 📄 Основные файлы

- **`AppState.ts`**: Управление состоянием приложения.
- **`Basket.ts`**: Управление корзиной покупок.
- **`Card.ts`**: Компонент карточки товара.
- **`Contact.ts`**: Компонент контактной информации.
- **`Order.ts`**: Процесс оформления заказа.
- **`Page.ts`**: Базовый компонент страницы.
- **`Success.ts`**: Страница успешного оформления заказа.

### 📄 `index.ts`

Основной входной файл для инициализации и запуска приложения.

### UML-схема

![UML](<UML-схема классов.png>)

Эта схема должна отражать структуру проекта, соответствующую принципу MVP, и показывать порядок взаимодействия между компонентами.

### 🚀 Технологии

- **HTML5**
- **SCSS** для стилизации
- **TypeScript** для типизации и улучшения качества кода
- **Webpack** для сборки модулей