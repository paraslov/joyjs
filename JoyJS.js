import { validateComponentFunction, validateComponentInstance } from './validations.js'
import { useStateFactory } from './core/useState/useStateFactory.js'
import { renderComponent } from './core/joyJs/render-component.js'
import { refreshComponent } from './core/joyJs/refresh-component.js'
import { createChildComponent } from './core/joyJs/create-children-component.js'
import { setParentChildrenComponents } from './core/joyJs/set-parent-children-components.js'
import { getComponentInstance } from './core/joyJs/get-component-instance.js'

class JoyJS {
  create(ComponentFunction, props = {}, {parentInstance} = {parentInstance: null}) {
    validateComponentFunction(ComponentFunction)

    const componentStates = []
    const componentJoy = {
      useState: (initialState) => {
        const refreshComponent = () => componentInstance.renderJoy.refresh()

        return useStateFactory(initialState, componentStates, refreshComponent)
      }
    }
    const componentInstance = getComponentInstance(ComponentFunction, props, componentJoy)
    componentInstance.renderJoy = {
      create: (ChildrenComponentFunction, props) => createChildComponent(componentInstance, ChildrenComponentFunction, props),
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
