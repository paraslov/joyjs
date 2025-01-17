export function renderComponent(componentInstance, componentStates) {
  componentInstance.childrenIndex = -1;

  componentInstance.type.render({
    element: componentInstance.element,
    localState: componentInstance.localState,
    props: componentInstance.props,
    joy: componentInstance.renderJoy,
    componentStates: componentStates.map((cs) => [cs[0].value, cs[1]]),
  });
}
