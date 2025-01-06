import {checkSameProps} from './checkSameProps.js'

class JoyJS {
  create(ComponentFunction, props = {}, {parentInstance} = {parentInstance: null}) {
    let componentInstance = {}

    const renderJoy = createRenderJoy(() => componentInstance, this)
    const componentJoy = createComponentJoy(() => componentInstance, ComponentFunction, renderJoy)

    Object.setPrototypeOf(renderJoy, componentJoy) // inherit refresh method

    componentInstance = getComponentInstance(ComponentFunction, props, componentJoy)

    renderJoy.setComponentInstance(componentInstance)
    componentJoy.setComponentInstance(componentInstance)
    const componentState = componentJoy.getComponentState()

    if (parentInstance) {
      setParentChildrenComponents(parentInstance, componentInstance)
    }

    renderComponent(componentInstance, ComponentFunction, renderJoy, componentState)

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
  let setStateFunction = null
  let currentIndex = 0
  const componentStates = []

  const componentJoy = {
    refresh() {
      if (!componentInstance?.element) {
        throw new Error('componentInstance.element is not defined.')
      }
      this.resetStateIndex?.()

      componentInstance.element.innerHTML = ''

      if (componentInstance.childrenComponents) {
        componentInstance.childrenComponents.forEach(cc => cc.cleanup?.())
      }

      console.log('@> comp comp states!!: ', componentStates)
      renderComponent(componentInstance, ComponentFunction, renderJoy, componentStates)
    },
    useState(initialState) {
      const index = currentIndex
      currentIndex++

      if (states.value[index] === undefined) {
        states.value[index] = initialState
      }

      setStateFunction = (newState) => {
        if (typeof newState === 'function') {
          states.value[index] = newState(states.value[index])
          componentStates[index][0] = states.value[index]
        } else {
          console.log('@> states.value[index]: ', states.value[index])
          console.log('@> newState: ', newState)
          states.value[index] = newState
          componentStates[index][0] = newState
          console.log('@> states.value[index]: ', states.value[index])
        }
        this.refresh()
      }

      componentStates.push([states.value[index], setStateFunction])
      console.log('@> compstates: ', componentStates)
      return [states.value[index], setStateFunction]
    },
    setComponentInstance(instance) {
      componentInstance = instance
    },
    getComponentState() {
      return componentStates
    },
    resetStateIndex() {
      currentIndex = 0
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
    componentStates,
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
