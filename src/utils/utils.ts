// Импортируем необходимые типы
import { SelectorCollection, SelectorElement } from "../types";

// Экспортируем функции
export function isPlainObject(obj: any): boolean {
    // Реализация функции
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

export function setElementData(element: HTMLElement, data: Record<string, string>): void {
    // Реализация функции
    Object.entries(data).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
}

/**
 * Обеспечивает клонирование шаблона.
 * @param template Шаблон, который требуется клонировать.
 * @returns Клонированный шаблон.
 */
export function cloneTemplate(template: HTMLTemplateElement): HTMLTemplateElement {
    return template.content.cloneNode(true) as HTMLTemplateElement;
}

export function ensureElement<T extends HTMLElement>(selectorElement: SelectorElement<T>, context?: HTMLElement): T {
    // Реализация функции
    if (context) {
        const element = context.querySelector(selectorElement);
        if (element !== null) {
            return element as T;
        } else {
            throw new Error(`Element with selector "${selectorElement}" not found in the provided context.`);
        }
    } else {
        const element = document.querySelector(selectorElement);
        if (element !== null) {
            return element as T;
        } else {
            throw new Error(`Element with selector "${selectorElement}" not found in the document.`);
        }
    }
}

export function createElement<T extends HTMLElement>(
    tagName: keyof HTMLElementTagNameMap,
    props?: Partial<Record<keyof T, string | boolean | object>>,
    children?: HTMLElement | HTMLElement[]
): T {
    // Реализация функции
    const element = document.createElement(tagName);
    if (props) {
        for (const [key, value] of Object.entries(props)) {
            if (typeof value === 'object' && value !== null) {
                Object.assign(element[key], value);
            } else {
                (element as any)[key] = value;
            }
        }
    }

    if (children) {
        if (Array.isArray(children)) {
            element.append(...children);
        } else {
            element.append(children);
        }
    }
    return element as T;
}
