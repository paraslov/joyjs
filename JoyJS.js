export const Joy = {
  create(ComponentFunction, props = {}, { parentInstance } = { parentInstance: null }) {
    const componentJoy = {
      refresh() {
        componentInstance.element.innerHTML = ''

        if (componentInstance.childrenComponents) {
          componentInstance.childrenComponents.forEach(cc => cc.cleanup?.())
          componentInstance.childrenComponents = []
        }

        renderComponent()
      }
    }
    const renderJoy = {
      create(ChildrenComponentFunction, props) {
        const childrenComponentInstance = Joy.create(ChildrenComponentFunction, props, { parentInstance: componentInstance })

        return childrenComponentInstance
      },
    }
    Object.setPrototypeOf(renderJoy, componentJoy); // inherit refresh method

    const componentInstance = ComponentFunction(props, { joy: componentJoy })

    if (parentInstance) {
      if (!parentInstance.childrenComponents) parentInstance.childrenComponents = []

      parentInstance.childrenComponents.push(componentInstance)
    }

    function renderComponent() {
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
