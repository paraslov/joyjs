import {checkSameProps} from './checkSameProps.js'
import {validateComponentFunction, validateComponentInstance} from "./validations.js";
import {useStateFactory} from "./core/useState/useStateFactory.js";

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
      refresh: () => refresh(componentInstance, componentStates),
    }
    validateComponentInstance(componentInstance)

    if (parentInstance) {
      setParentChildrenComponents(parentInstance, componentInstance)
    }

    renderComponent(componentInstance, componentStates)

    return componentInstance
  }
}

function refresh(componentInstance, componentStates) {
  if (!componentInstance?.element) {
    throw new Error('componentInstance.element is not defined.')
  }

  componentInstance.element.innerHTML = ''

  if (componentInstance.childrenComponents) {
    componentInstance.childrenComponents.forEach(cc => cc.cleanup?.())
  }

  renderComponent(componentInstance, componentStates)
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

// used into component render method
function createRenderJoy(getComponentInstance, Joy) {
  let componentInstance = null

  const renderJoy = {
    create: (ChildrenComponentFunction, props) => createChildComponent(componentInstance, ChildrenComponentFunction, props),
    setComponentInstance(instance) {
      componentInstance = instance
    },
  }

  return renderJoy
}

// used in component
function createComponentJoy(getComponentInstance, ComponentFunction) {
  let componentInstance = null
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

      renderComponent(componentInstance, componentStates)
    },
    useState: useStatFactory(componentStates),
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

  return componentInstance
}

function renderComponent(componentInstance, componentStates) {
  componentInstance.childrenIndex = -1

  componentInstance.type.render({
    element: componentInstance.element,
    localState: componentInstance.localState,
    props: componentInstance.props,
    joy: componentInstance.renderJoy,
    componentStates: componentStates.map(cs => [cs[0].value, cs[1]]),
  })
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
