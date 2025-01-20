import { ComponentInstance, ComponentStates } from '../types/core-types.ts';

export function renderComponent(componentInstance: ComponentInstance, componentStates: ComponentStates) {
  componentInstance.type.render?.({
    element: componentInstance.element,
    props: componentInstance.props,
    joy: componentInstance.renderJoy,
    componentStates: componentStates.map((cs) => [cs[0].value, cs[1]]),
  });
}
