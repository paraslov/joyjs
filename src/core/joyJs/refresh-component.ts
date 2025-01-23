import { renderComponent } from './render-component.ts';

import { ComponentInstance } from '../types/core-types.ts';

export function refreshComponent(componentInstance: ComponentInstance) {
  if (!componentInstance?.element) {
    throw new Error('componentInstance.element is not defined.');
  }

  componentInstance.element.innerHTML = '';

  if (componentInstance.childrenComponents) {
    for (const child of componentInstance.childrenComponents) {
      child.cleanups.forEach((cb) => {
        cb?.()
      })
    }
  }

  renderComponent(componentInstance);
}
