import { useStateFactory } from './core/useState/useStateFactory.ts';
import { renderComponent } from './core/joyJs/render-component.ts';
import { refreshComponent } from './core/joyJs/refresh-component.ts';
import { createChildComponent } from './core/joyJs/create-children-component.ts';
import { setParentChildrenComponents } from './core/joyJs/set-parent-children-components.ts';
import { getComponentInstance } from './core/joyJs/get-component-instance.ts';
import {
  ComponentInstance,
  ComponentJoy,
  ComponentStates,
  JoyComponent,
  JoyCreateOptions,
  JoyProps,
  RenderJoyCreateOptions
} from './core/types/core-types.ts';
import { JoyJsError, validateComponentFunction, validateComponentInstance } from './core/validations/validations.ts';
import { createHtmlElement } from './core/joyJs/createHtmlElement.ts';

class JoyJS {
  create(
    ComponentFunction: JoyComponent,
    props: JoyProps = {},
    { parentInstance, key }: JoyCreateOptions = { parentInstance: null }
  ): ComponentInstance {
    validateComponentFunction(ComponentFunction);

    const componentStates: ComponentStates = [];
    let componentRootElement: HTMLElement | null = null;

    const componentJoy: ComponentJoy = {
      useState<T>(initialState: T) {
        const refreshComponentFn = () => componentInstance.renderJoy.refresh();
        return useStateFactory<T>(initialState, componentStates, refreshComponentFn);
      },
      create(tagName, props = {}) {
        componentRootElement = createHtmlElement(tagName, props);
        return componentRootElement;
      }
    };

    const componentInstance = getComponentInstance(ComponentFunction, props, componentJoy);
    if (!componentRootElement) {
      throw new JoyJsError('You must call liba.create in your component function for creating root element: ' + ComponentFunction.name);
    }
    componentInstance.element = componentRootElement;
    componentInstance.props = props;

    componentInstance.renderJoy = {
      create(tagNameOrComponentFn, props: any = {}, options?: RenderJoyCreateOptions): any {
        if (isJoyType(tagNameOrComponentFn)) {
          const newComponent = createChildComponent(componentInstance, tagNameOrComponentFn, props, options);
          componentRootElement?.append(newComponent.element);

          return newComponent;
        } else {
          const newElement = createHtmlElement(tagNameOrComponentFn, props);

          componentRootElement?.append(newElement);
          return newElement;
        }
      },
      refresh() {
        refreshComponent(componentInstance, componentStates);
      }
    };

    validateComponentInstance(componentInstance);

    if (parentInstance) {
      setParentChildrenComponents(parentInstance, componentInstance, key);
    }

    renderComponent(componentInstance, componentStates);
    return componentInstance;
  }
}

export const Joy = new JoyJS();

function isJoyType(fnOrTag: unknown): fnOrTag is JoyComponent {
  return typeof fnOrTag === 'function';
}
