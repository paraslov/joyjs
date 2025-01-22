import { JoyComponent, ComponentInstance, ComponentJoy, JoyProps } from '../types/core-types.ts';

export function getComponentInstance(ComponentFunction: JoyComponent, props: JoyProps, componentJoy: ComponentJoy): ComponentInstance {
  const componentInstance: ComponentInstance = ComponentFunction(props, { joy: componentJoy });
  componentInstance.type = ComponentFunction;
  componentInstance.status = 'created';

  return componentInstance;
}
