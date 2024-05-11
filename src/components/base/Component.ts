/**
 * Абстрактный класс компонента
 */
export abstract class Component<T> {
  protected constructor(protected readonly container: HTMLElement) {

  }

  /**
   * Переключение классов элемента
   * @param element Элемент DOM
   * @param className Название класса
   * @param force Принудительное применение или снятие класса
   */
  toggleClass(element: HTMLElement, className: string, force?: boolean) {
    element.classList.toggle(className, force);
  }

  /**
   * Обновление текстового содержимого элемента
   * @param element Элемент DOM
   * @param value Значение, которое будет установлено в качестве текста
   */
  protected setText(element: HTMLElement, value: unknown) {
    if(element) {
      element.textContent = String(value);
    }
  }

  /**
   * Установка состояния блокировки элемента
   * @param element Элемент DOM
   * @param state Состояние блокировки
   */
  setDisable(element: HTMLElement, state: boolean) {
    if(element) {
      if(state) element.setAttribute('disabled', 'disabled');
      else element.removeAttribute('disabled');
    }
  }

  /**
   * Скрытие элемента
   * @param element Элемент DOM
   */
  protected setHidden(element: HTMLElement) {
    element.style.display = 'none';
  }

  /**
   * Отображение элемента
   * @param element Элемент DOM
   */
  protected setVisible(element: HTMLElement) {
    element.style.removeProperty('display');
  }

  /**
   * Установка изображения
   * @param element Элемент DOM (должен быть HTMLImageElement)
   * @param src URL изображения
   * @param alt Альтернативный текст изображения
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
   * Возвращает рендер компонента в DOM
   * @param data Данные для обновления компонента
   */
  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}
