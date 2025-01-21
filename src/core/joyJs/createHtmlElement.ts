export type HtmlElementProps = {
  [key: string]: any;
  children?: (HTMLElement | string | number)[];
}

export type TagNamesMap = keyof HTMLElementTagNameMap;

type DisabledElements =
  HTMLButtonElement
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLFieldSetElement
  | HTMLOptGroupElement
  | HTMLOptionElement;

export function createHtmlElement(tagName: TagNamesMap, props: HtmlElementProps = {}): HTMLElement {
  const element = document.createElement(tagName);

  if (Array.isArray(props.children)) {
    props.children.forEach(child => {
      if (typeof child === 'string' || typeof child === 'number') {
        element.append(child.toString());
      } else if (child instanceof HTMLElement) {
        element.append(child);
      }
    });
  }

  Object.keys(props).forEach(key => {
    if (key === 'children') return;

    if (key.startsWith('on') && typeof props[key] === 'function') {
      const event = key.slice(2).toLowerCase();
      element.addEventListener(event, props[key]); // Добавляем слушатель события
    } else if (key === 'checked' && tagName === 'input') {
      (element as HTMLInputElement).checked = Boolean(props[key]);
    } else if (key === 'value' && (tagName === 'input' || tagName === 'textarea' || tagName === 'select')) {
      (element as HTMLInputElement | HTMLTextAreaElement).value = props[key];
    } else if (key === 'disabled' && 'disabled' in element) {
      (element as DisabledElements).disabled = Boolean(props[key]);
    } else {
      element.setAttribute(key, props[key]);
    }
  });

  return element;
}
