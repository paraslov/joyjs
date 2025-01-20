import { useStateFactory } from './core/useState/useStateFactory.ts';
import { renderComponent } from './core/joyJs/render-component.ts';
import { refreshComponent } from './core/joyJs/refresh-component.ts';
import { createChildComponent } from './core/joyJs/create-children-component.ts';
import { setParentChildrenComponents } from './core/joyJs/set-parent-children-components.ts';
import { getComponentInstance } from './core/joyJs/get-component-instance.ts';
import {
  JoyComponent,
  ComponentInstance,
  ComponentJoy,
  ComponentStates,
  ParentInstance,
  JoyProps
} from './core/types/core-types.ts';
import { validateComponentFunction, validateComponentInstance } from './core/validations/validations.ts';

class JoyJS {
  create(
    ComponentFunction: JoyComponent,
    props: JoyProps = {},
    { parentInstance }: { parentInstance?: ParentInstance } = { parentInstance: null }
  ): ComponentInstance {
    validateComponentFunction(ComponentFunction);

    const componentStates: ComponentStates = [];
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
