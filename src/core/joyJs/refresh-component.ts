import { renderComponent } from './render-component.ts';

import { ComponentInstance } from '../types/core-types.ts';

export function refreshComponent(componentInstance: ComponentInstance, componentStates: any[]) {
  if (!componentInstance?.element) {
    throw new Error('componentInstance.element is not defined.');
  }

  componentInstance.element.innerHTML = '';

  if (componentInstance.childrenComponents) {
    componentInstance.childrenComponents.forEach((cc) => cc.cleanup?.());
  }

  renderComponent(componentInstance, componentStates);
}
