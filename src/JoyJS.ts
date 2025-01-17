import {
  validateComponentFunction,
  validateComponentInstance,
} from '../validations.js'
import { useStateFactory } from './core/useState/useStateFactory.js'
import { renderComponent } from './core/joyJs/render-component.js'
import { refreshComponent } from './core/joyJs/refresh-component.js'
import { createChildComponent } from './core/joyJs/create-children-component.ts'
import { setParentChildrenComponents } from './core/joyJs/set-parent-children-components.js'
import { getComponentInstance } from './core/joyJs/get-component-instance.js'

type ComponentFunction = (props: Record<string, any>) => any;
type Props = Record<string, any>;

type ComponentInstance = {
  renderJoy: {
    create: (ChildrenComponentFunction: ComponentFunction, props: Props) => ComponentInstance;
    refresh: () => void;
  };
};

type ParentInstance = ComponentInstance | null;

type ComponentJoy = {
  useState: <T>(initialState: T) => [T, (newState: T) => void];
};

class JoyJS {
  create(
    ComponentFunction: ComponentFunction,
    props: Props = {},
    {parentInstance}: { parentInstance?: ParentInstance } = {parentInstance: null}
  ): ComponentInstance {
    validateComponentFunction(ComponentFunction)

    const componentStates: any[] = []
    const componentJoy: ComponentJoy = {
      useState: <T>(initialState: T) => {
        const refreshComponentFn = () => componentInstance.renderJoy.refresh()
        return useStateFactory(initialState, componentStates, refreshComponentFn)
      },
    }

    const componentInstance = getComponentInstance(ComponentFunction, props, componentJoy)

    componentInstance.renderJoy = {
      create: (ChildrenComponentFunction, props) =>
        createChildComponent(componentInstance, ChildrenComponentFunction, props),
      refresh: () => refreshComponent(componentInstance, componentStates),
    }

    validateComponentInstance(componentInstance)

    if (parentInstance) {
      setParentChildrenComponents(parentInstance, componentInstance)
    }

    renderComponent(componentInstance, componentStates)
    return componentInstance
  }
}

export const Joy = new JoyJS()
