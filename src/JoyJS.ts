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
import { validateComponentFunction, validateComponentInstance } from './core/validations/validations.ts';

class JoyJS {
  create(
    ComponentFunction: JoyComponent,
    props: JoyProps = {},
    { parentInstance, key }: JoyCreateOptions = { parentInstance: null }
  ): ComponentInstance {
    validateComponentFunction(ComponentFunction);

    const componentStates: ComponentStates = [];
    const componentJoy: ComponentJoy = {
      useState: <T>(initialState: T) => {
        const refreshComponentFn = () => componentInstance.renderJoy.refresh();
        return useStateFactory<T>(initialState, componentStates, refreshComponentFn);
      }
    };

    const componentInstance = getComponentInstance(ComponentFunction, props, componentJoy);

    componentInstance.renderJoy = {
      create: (ChildrenComponentFunction, props, options?: RenderJoyCreateOptions) =>
        createChildComponent(componentInstance, ChildrenComponentFunction, props, options),
      refresh: () => refreshComponent(componentInstance, componentStates)
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
