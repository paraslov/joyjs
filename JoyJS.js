import { checkSameProps } from "./checkSameProps.js";

export const Joy = {
  create(ComponentFunction, props = {}, { parentInstance } = { parentInstance: null }) {
    const componentJoy = {
      refresh() {
        componentInstance.element.innerHTML = ''

        if (componentInstance.childrenComponents) {
          componentInstance.childrenComponents.forEach(cc => cc.cleanup?.())
        }

        renderComponent()
      }
    }
    const renderJoy = {
      create(ChildrenComponentFunction, props) {
        componentInstance.childrenIndex++
        const cachedComponentInstance = componentInstance.childrenComponents?.[componentInstance.childrenIndex]

        if (cachedComponentInstance) {
          if (cachedComponentInstance.type === ChildrenComponentFunction) {
            if (checkSameProps(props, cachedComponentInstance.props)) {
              return cachedComponentInstance
            } else {
              cachedComponentInstance.props = props
              cachedComponentInstance.refresh()

              return cachedComponentInstance
            }
          }

          delete componentInstance.childrenComponents[componentInstance.childrenIndex]
        }

        const childrenComponentInstance = Joy.create(ChildrenComponentFunction, props, { parentInstance: componentInstance })

        return childrenComponentInstance
      },
    }
    Object.setPrototypeOf(renderJoy, componentJoy); // inherit refresh method

    const componentInstance = ComponentFunction(props, { joy: componentJoy })
    componentInstance.type = ComponentFunction
    componentInstance.refresh = componentJoy.refresh

    if (parentInstance) {
      if (!parentInstance.childrenComponents) parentInstance.childrenComponents = []

      parentInstance.childrenComponents[parentInstance.childrenIndex] = componentInstance
    }

    function renderComponent() {
      componentInstance.childrenIndex = -1

      ComponentFunction.render({
        element: componentInstance.element,
        localState: componentInstance.localState,
        props: componentInstance.props,
        joy: renderJoy,
      })
    }

    renderComponent()
    return componentInstance
  }
}
