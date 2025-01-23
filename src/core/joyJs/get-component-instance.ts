import { JoyComponent, ComponentInstance} from '../types/core-types.ts';

export function getComponentInstance(ComponentFunction: JoyComponent): ComponentInstance {
  const componentInstance: ComponentInstance = {} as ComponentInstance;
  componentInstance.type = ComponentFunction;
  componentInstance.status = 'created';
  componentInstance.cleanups = [];

  return componentInstance;
}
