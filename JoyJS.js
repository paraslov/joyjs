import {checkSameProps} from './checkSameProps.js'
import {validateComponentFunction, validateComponentInstance} from "./validations.js";
import {useStateFactory} from "./core/useState/useStateFactory.js";
import {renderComponent} from "./core/joyJs/render-component.js";
import {refreshComponent} from "./core/joyJs/refresh-component.js";

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

function createChildComponent(componentInstance, ChildrenComponentFunction, props) {
  if (!componentInstance?.element) {
    throw new Error('componentInstance.element is not defined.')
  }

  componentInstance.childrenIndex++
  const cachedComponentInstance = componentInstance.childrenComponents?.[componentInstance.childrenIndex]

  if (cachedComponentInstance) {
    const isComponentSameTypeAsItWas = cachedComponentInstance.type === ChildrenComponentFunction

    if (isComponentSameTypeAsItWas) {
      return getUpdatedComponent(cachedComponentInstance, props)
    }

    delete componentInstance.childrenComponents[componentInstance.childrenIndex]
  }

  return Joy.create(ChildrenComponentFunction, props, {parentInstance: componentInstance})
}

function getComponentInstance(ComponentFunction, props, componentJoy) {
  const componentInstance = ComponentFunction(props, {joy: componentJoy})
  componentInstance.type = ComponentFunction

  return componentInstance
}

function getUpdatedComponent(cachedComponentInstance, props) {
  if (checkSameProps(props, cachedComponentInstance.props)) {
    return cachedComponentInstance
  }

  cachedComponentInstance.props = props
  cachedComponentInstance.renderJoy.refresh()

  return cachedComponentInstance
}

function setParentChildrenComponents(parentInstance, componentInstance) {
  if (!parentInstance.childrenComponents) parentInstance.childrenComponents = []

  parentInstance.childrenComponents[parentInstance.childrenIndex] = componentInstance
}

export const Joy = new JoyJS()
