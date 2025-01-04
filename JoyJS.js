import {checkSameProps} from "./checkSameProps.js";

class JoyJS {
  create(ComponentFunction, props = {}, { parentInstance } = { parentInstance: null }) {
    const renderJoy = {
      create(ChildrenComponentFunction, props) {
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
    }
    const componentJoy = {
      refresh() {
        componentInstance.element.innerHTML = ''

        if (componentInstance.childrenComponents) {
          componentInstance.childrenComponents.forEach(cc => cc.cleanup?.())
        }

        renderComponent(componentInstance, ComponentFunction, renderJoy)
      }
    }
    Object.setPrototypeOf(renderJoy, componentJoy); // inherit refresh method

    const componentInstance = getComponentInstance(ComponentFunction, props, componentJoy)

    if (parentInstance) {
      setParentChildrenComponents(parentInstance, componentInstance)
    }

    renderComponent(componentInstance, ComponentFunction, renderJoy)

    return componentInstance
  }
}

function createRenderJoy (componentInstance, Joy) {
  return {
    create(ChildrenComponentFunction, props) {
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
  }
}

function getComponentInstance(ComponentFunction, props, componentJoy) {
  const componentInstance = ComponentFunction(props, { joy: componentJoy })
  componentInstance.type = ComponentFunction
  componentInstance.refresh = componentJoy.refresh

  return componentInstance
}

function renderComponent(componentInstance, ComponentFunction, renderJoy) {
  componentInstance.childrenIndex = -1

  ComponentFunction.render({
    element: componentInstance.element,
    localState: componentInstance.localState,
    props: componentInstance.props,
    joy: renderJoy,
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
