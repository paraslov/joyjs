import { ComponentFunction, ComponentJoy, Props } from '../../JoyJS.ts';

export function getComponentInstance(ComponentFunction: ComponentFunction, props: Props, componentJoy: ComponentJoy) {
  const componentInstance = ComponentFunction(props, { joy: componentJoy });
  componentInstance.type = ComponentFunction;

  return componentInstance;
}
