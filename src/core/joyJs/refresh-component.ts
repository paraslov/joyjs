import { renderComponent } from './render-component.js';
import { ComponentInstance } from 'src/JoyJS.js';

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
