import { ComponentFunction, ComponentInstance, ComponentJoy, Props } from '../../JoyJS.ts';

export function getComponentInstance(ComponentFunction: ComponentFunction, props: Props, componentJoy: ComponentJoy): ComponentInstance {
  const componentInstance = ComponentFunction(props, { joy: componentJoy });
  componentInstance.type = ComponentFunction;

  return componentInstance;
}
