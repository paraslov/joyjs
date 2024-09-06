export const Joy = {
  create(ComponentFunction, props = {}) {
    const componentInstance = ComponentFunction(props)

    ComponentFunction.render({
      element: componentInstance.element,
      localState: componentInstance.localState,
      props: componentInstance.props,
      joy: Joy,
    })

    return componentInstance
  }
}
