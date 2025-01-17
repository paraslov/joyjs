import { validateComponentFunction, validateComponentInstance, } from '../validations.js';
import { useStateFactory } from './core/useState/useStateFactory.js';
import { renderComponent } from './core/joyJs/render-component.ts';
import { refreshComponent } from './core/joyJs/refresh-component.ts';
import { createChildComponent } from './core/joyJs/create-children-component.ts';
import { setParentChildrenComponents } from './core/joyJs/set-parent-children-components.ts';
import { getComponentInstance } from './core/joyJs/get-component-instance.ts';
import { ComponentFunction, ComponentInstance, ComponentJoy, ParentInstance, Props } from './core/types/core-types.ts';

class JoyJS {
  create(
    ComponentFunction: ComponentFunction,
    props: Props = {},
    { parentInstance }: { parentInstance?: ParentInstance } = { parentInstance: null }
  ): ComponentInstance {
    validateComponentFunction(ComponentFunction);

    const componentStates: any[] = [];
    const componentJoy: ComponentJoy = {
      useState: <T>(initialState: T) => {
        const refreshComponentFn = () => componentInstance.renderJoy.refresh();
        return useStateFactory(initialState, componentStates, refreshComponentFn);
      },
    };

    const componentInstance = getComponentInstance(ComponentFunction, props, componentJoy);

    componentInstance.renderJoy = {
      create: (ChildrenComponentFunction, props) =>
        createChildComponent(componentInstance, ChildrenComponentFunction, props),
      refresh: () => refreshComponent(componentInstance, componentStates),
    };

    validateComponentInstance(componentInstance);

    if (parentInstance) {
      setParentChildrenComponents(parentInstance, componentInstance);
    }

    renderComponent(componentInstance, componentStates);
    return componentInstance;
  }
}

export const Joy = new JoyJS();
