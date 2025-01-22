import { ComponentInstance, ComponentStates } from '../types/core-types.ts';

export function renderComponent(componentInstance: ComponentInstance, componentStates: ComponentStates) {
  componentInstance.useStatesIndex = -1;
  if (componentInstance.status === 'created') {
    componentInstance.status = 'first-render';
  }

  componentInstance.type.render?.({
    element: componentInstance.element,
    props: componentInstance.props,
    joy: componentInstance.renderJoy,
    componentStates: componentStates.map((cs) => [cs[0].value, cs[1]]),
  });

  componentInstance.status = 'other';
}
