/**
 * Абстрактный класс для создания компонентов
 * @abstract
 */
export abstract class Component<T> {
  /**
   * Конструктор класса
   * @param {HTMLElement} container Контейнер для рендера
   */
  protected constructor(protected readonly container: HTMLElement) {
  }

  /**
   * Переключение классов элемента
   * @param {HTMLElement} element Элемент, для которого нужно переключить классы
   * @param {string} className Имя класса, который нужно переключить
   * @param {boolean} [force] Если указано, то класс будет добавлен или удален независимо от его текущего состояния
   */
  toggleClass(element: HTMLElement, className: string, force?: boolean) {
    element.classList.toggle(className, force);
  }

  /**
   * Обновление текстового содержимого элемента
   * @param {HTMLElement} element Элемент, для которого нужно обновить текстовое содержимое
   * @param {unknown} value Новое значение текстового содержимого
   */
  protected setText(element: HTMLElement, value: unknown) {
    if(element) {
      element.textContent = String(value);
    }
  }

  /**
   * Установка статуса блокировки элемента
   * @param {HTMLElement} element Элемент, для которого нужно установить статус блокировки
   * @param {boolean} state Статус блокировки
   */
  setDisable(element: HTMLElement, state: boolean) {
    if(element) {
      if(state) element.setAttribute('disabled', 'disabled');
      else element.removeAttribute('disabled');
    }
  }

  /**
   * Скрытие элемента
   * @param {HTMLElement} element Элемент, который нужно скрыть
   */
  protected setHidden(element: HTMLElement) {
    element.style.display = 'none';
  }

  /**
   * Показ элемента
   * @param {HTMLElement} element Элемент, который нужно показать
   */
  protected setVisible(element: HTMLElement) {
    element.style.removeProperty('display');
  }

  /**
   * Установка изображения
   * @param {HTMLElement} element Элемент, для которого нужно установить изображение
   * @param {string} src Ссылка на изображение
   * @param {string} [alt] Альтернативный текст на случай если отсутствует ссылка на изображение
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
   * Возвращает рендер в DOM
   * @param {Partial<T>} [data] Данные, которые нужно обновить перед рендером
   * @returns {HTMLElement} Контейнер компонента
   */
  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}
