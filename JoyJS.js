import {checkSameProps} from './checkSameProps.js'
import {validateComponentFunction, validateComponentInstance} from "./validations.js";
import {useStatFactory} from "./core/useState/useState.js";

class JoyJS {
  create(ComponentFunction, props = {}, {parentInstance} = {parentInstance: null}) {
    validateComponentFunction(ComponentFunction)
    let componentInstance = {}

    const renderJoy = createRenderJoy(() => componentInstance, this)
    const componentJoy = createComponentJoy(() => componentInstance, ComponentFunction, renderJoy)

    renderJoy.refresh = componentJoy.refresh // inherit refresh method

    componentInstance = getComponentInstance(ComponentFunction, props, componentJoy)
    validateComponentInstance(componentInstance)

    renderJoy.setComponentInstance(componentInstance)
    componentJoy.setComponentInstance(componentInstance)
    const componentStates = componentJoy.getComponentStates()

    if (parentInstance) {
      setParentChildrenComponents(parentInstance, componentInstance)
    }

    renderComponent(componentInstance, ComponentFunction, renderJoy, componentStates)

    return componentInstance
  }
}

// used into component render method
function createRenderJoy(getComponentInstance, Joy) {
  let componentInstance = null

  const renderJoy = {
    create(ChildrenComponentFunction, props) {
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
    },
    setComponentInstance(instance) {
      componentInstance = instance
    },
  }

  return renderJoy
}

// used in component
function createComponentJoy(getComponentInstance, ComponentFunction, renderJoy) {
  let componentInstance = null
  let states = {value: []}
  const componentStates = []

  const componentJoy = {
    refresh() {
      if (!componentInstance?.element) {
        throw new Error('componentInstance.element is not defined.')
      }

      componentInstance.element.innerHTML = ''

      if (componentInstance.childrenComponents) {
        componentInstance.childrenComponents.forEach(cc => cc.cleanup?.())
      }

      renderComponent(componentInstance, ComponentFunction, renderJoy, componentStates)
    },
    useState: useStatFactory(states, componentStates, renderJoy),
    setComponentInstance(instance) {
      componentInstance = instance
    },
    getComponentStates() {
      return componentStates
    },
  }

  return componentJoy
}

function getComponentInstance(ComponentFunction, props, componentJoy) {
  const componentInstance = ComponentFunction(props, {joy: componentJoy})
  componentInstance.type = ComponentFunction
  componentInstance.refresh = componentJoy.refresh

  return componentInstance
}

function renderComponent(componentInstance, ComponentFunction, renderJoy, componentStates) {
  componentInstance.childrenIndex = -1

  ComponentFunction.render({
    element: componentInstance.element,
    localState: componentInstance.localState,
    props: componentInstance.props,
    joy: renderJoy,
    componentStates: componentStates.map(cs => [cs[0].value, cs[1]]),
  })
}

function getUpdatedComponent(cachedComponentInstance, props) {
  if (checkSameProps(props, cachedComponentInstance.props)) {
    return cachedComponentInstance
  }

  cachedComponentInstance.props = props
  cachedComponentInstance.refresh()

  return cachedComponentInstance
}

function setParentChildrenComponents(parentInstance, componentInstance) {
  if (!parentInstance.childrenComponents) parentInstance.childrenComponents = []

  parentInstance.childrenComponents[parentInstance.childrenIndex] = componentInstance
}

export const Joy = new JoyJS()
