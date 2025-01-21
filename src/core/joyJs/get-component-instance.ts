import { JoyComponent, ComponentInstance, ComponentJoy, JoyProps } from '../types/core-types.ts';

export function getComponentInstance(ComponentFunction: JoyComponent, props: JoyProps, componentJoy: ComponentJoy): ComponentInstance {
  const componentInstance = ComponentFunction(props, { joy: componentJoy });
  componentInstance.type = ComponentFunction;

  return componentInstance;
}
