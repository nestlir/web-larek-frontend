/**
 * Абстрактный класс Component, представляющий базовый компонент с методами для работы с DOM-элементами.
 */
export abstract class Component<T> {
    // Конструктор, принимающий контейнер элемента
    protected constructor(protected readonly container: HTMLElement) {}
  
    /**
     * Переключение классов
     * @param element Элемент, у которого будет переключаться класс
     * @param className Имя класса для переключения
     * @param force (необязательно) Если передано, класс будет добавлен или удален в зависимости от значения (true/false)
     */
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
      element.classList.toggle(className, force);
    }
  
    /**
     * Обновление текстового содержимого
     * @param element Элемент, текстовое содержимое которого будет обновлено
     * @param value Новое текстовое содержимое
     */
    protected setText(element: HTMLElement, value: unknown) {
      if (element) {
        element.textContent = String(value);
      }
    }
  
    /**
     * Установка состояния блокировки для элемента
     * @param element Элемент, состояние блокировки которого будет изменено
     * @param state Новое состояние блокировки (true - заблокирован, false - разблокирован)
     */
    setDisable(element: HTMLElement, state: boolean) {
      if (element) {
        if (state) element.setAttribute('disabled', 'disabled');
        else element.removeAttribute('disabled');
      }
    }
  
    /**
     * Скрытие элемента
     * @param element Элемент, который нужно скрыть
     */
    protected setHidden(element: HTMLElement) {
      element.style.display = 'none';
    }
  
    /**
     * Отображение элемента
     * @param element Элемент, который нужно отобразить
     */
    protected setVisible(element: HTMLElement) {
      element.style.removeProperty('display');
    }
  
    /**
     * Установка изображения
     * @param element Элемент изображения (должен быть HTMLImageElement)
     * @param src Ссылка на изображение
     * @param alt (необязательно) Альтернативный текст для изображения
     */
    protected setImage(element: HTMLElement, src: string, alt?: string) {
      if (element instanceof HTMLImageElement) {
        element.src = src;
        if (alt) {
          element.alt = alt;
        } 
      }
    }
  
    /**
     * Рендер компонента в DOM
     * @param data (необязательно) Данные для обновления состояния компонента
     * @returns Контейнер компонента
     */
    render(data?: Partial<T>): HTMLElement {
      Object.assign(this as object, data ?? {});
      return this.container;
    }
  }
  