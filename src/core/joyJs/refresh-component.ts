import { renderComponent } from './render-component.ts';

import { ComponentInstance, ComponentStates } from '../types/core-types.ts';

export function refreshComponent(componentInstance: ComponentInstance, componentStates: ComponentStates) {
  if (!componentInstance?.element) {
    throw new Error('componentInstance.element is not defined.');
  }

  componentInstance.element.innerHTML = '';

  if (componentInstance.childrenComponents) {
    for (const child of componentInstance.childrenComponents) {
      child.cleanup?.()
    }
  }

  renderComponent(componentInstance, componentStates);
}
