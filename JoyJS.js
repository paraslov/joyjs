export const Joy = {
  create(ComponentFunction, props = {}) {
    const componentJoyInstance = {
      refresh() {
        componentInstance.element.innerHTML = ''
        renderComponent()
      }
    }
    const renderJoyInstance = {
      create: Joy.create,
    }
    Object.setPrototypeOf(renderJoyInstance, componentJoyInstance);

    const componentInstance = ComponentFunction(props, { joy: componentJoyInstance })

    function renderComponent() {
      ComponentFunction.render({
        element: componentInstance.element,
        localState: componentInstance.localState,
        props: componentInstance.props,
        joy: renderJoyInstance,
      })
    }

    renderComponent()
    return componentInstance
  }
}
