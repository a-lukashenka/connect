import { Attribute } from './models/classes/attribute';

export class DDM {
    static create(elName: string, attr: Attribute[], innerHtml?: string): HTMLElement {
        const element = document.createElement(elName);
        attr.forEach(attr => {
            DDM.setAttribute(element, attr);
        });
        if (innerHtml) {
            DDM.setHtml(element, innerHtml);
        }
        return element;
    }

    static get(id: string): HTMLElement {
        return document.getElementById(id);
    }

    static remove(element: HTMLElement): void {
        element.parentNode.removeChild(element);
    }

    static setAttribute(element: HTMLElement, attr: Attribute): void {
        element.setAttribute(attr.name, attr.value);
    }

    static createTextNode(value: string): Text {
        return document.createTextNode(value);
    }

    static setHtml(element: HTMLElement, html: string): void {
        element.innerHTML += html;
    }

    static append(parent: HTMLElement, child: HTMLElement | Text): void {
        parent.appendChild(child);
    }
}
