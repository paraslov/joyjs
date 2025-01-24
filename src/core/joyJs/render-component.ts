import { ComponentInstance } from '../types/core-types.ts';

export function renderComponent(componentInstance: ComponentInstance) {
  componentInstance.useStatesIndex = -1;
  componentInstance.useEffectsIndex = -1;
  componentInstance.useEffectsCurrentCount = 0;
  componentInstance.useStatesCurrentCount = 0;

  if (componentInstance.status === 'created') {
    componentInstance.status = 'first-render';
  }

  componentInstance.type({
    props: componentInstance.props,
    joy: componentInstance.renderJoy,
  });

  componentInstance.status = 'other';
}
