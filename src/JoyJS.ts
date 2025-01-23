import { useStateFactory } from './core/useState/useStateFactory.ts';
import { renderComponent } from './core/joyJs/render-component.ts';
import { refreshComponent } from './core/joyJs/refresh-component.ts';
import { createChildComponent } from './core/joyJs/create-children-component.ts';
import { setParentChildrenComponents } from './core/joyJs/set-parent-children-components.ts';
import { getComponentInstance } from './core/joyJs/get-component-instance.ts';
import {
  ComponentInstance,
  ComponentStates,
  JoyComponent,
  JoyCreateOptions,
  JoyProps,
  RenderJoyCreateOptions
} from './core/types/core-types.ts';
import { JoyJsError, validateComponentFunction } from './core/validations/validations.ts';
import { createHtmlElement, TagNamesMap } from './core/joyJs/createHtmlElement.ts';

class JoyJS {
  create(
    ComponentFunction: JoyComponent,
    props: JoyProps = {},
    { parentInstance, key }: JoyCreateOptions = { parentInstance: null }
  ): ComponentInstance {
    validateComponentFunction(ComponentFunction);

    const componentStates: ComponentStates = [];
    const componentInstance = getComponentInstance(ComponentFunction);

    componentInstance.props = props;

    componentInstance.renderJoy = {
      create(tagNameOrComponentFn, props: any = {}, options?: RenderJoyCreateOptions): any {
        if (!componentInstance.element) {
          new JoyJsError(`First you should render a root element (joy.createRoot(tagName)) in your component: ${ componentInstance.type.name }`);
        }

        if (isJoyFunctionType(tagNameOrComponentFn)) {
          const newComponent = createChildComponent(componentInstance, tagNameOrComponentFn, props, options);
          componentInstance.element.append(newComponent.element);

          return newComponent;
        } else if (isTagNameType(tagNameOrComponentFn)) {
          const newElement = createHtmlElement(tagNameOrComponentFn, props);

          componentInstance.element.append(newElement);
          return newElement;
        }
      },
      refresh() {
        refreshComponent(componentInstance, componentStates);
      },
      useState<T>(initialState: T) {
        componentInstance.useStatesIndex++;

        if (componentInstance.status === 'first-render') {
          const refreshComponentFn = () => componentInstance.renderJoy.refresh();
          return useStateFactory<T>(initialState, componentStates, refreshComponentFn);
        } else {
          const componentState = componentStates[componentInstance.useStatesIndex];
          return [componentState[0].value, componentState[1]];
        }
      },
      useEffect(cb, deps = []) {
        componentInstance.useEffectsIndex++;

        if (componentInstance.status === 'first-render') {
          const cleanupFn = cb();

          if (cleanupFn) {
            componentInstance.cleanups.push(cleanupFn);
          }
        } else {
          // todo: deps analyze
        }
      },
      createRoot(tagName, props = {}) {
        if (componentInstance.status === 'first-render') {
          componentInstance.element = createHtmlElement(tagName, props);
        }

        return componentInstance.element;
      }
    };

    if (parentInstance) {
      setParentChildrenComponents(parentInstance, componentInstance, key);
    }

    renderComponent(componentInstance);
    return componentInstance;
  }
}

export const Joy = new JoyJS();

function isJoyFunctionType(fnOrTag: unknown): fnOrTag is JoyComponent {
  return typeof fnOrTag === 'function';
}

function isTagNameType(fnOrTag: unknown): fnOrTag is TagNamesMap {
  return typeof fnOrTag === 'string';
}
