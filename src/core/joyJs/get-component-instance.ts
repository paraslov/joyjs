import { JoyComponent, ComponentInstance} from '../types/core-types.ts';

export function getComponentInstance(ComponentFunction: JoyComponent): ComponentInstance {
  const componentInstance: ComponentInstance = {} as ComponentInstance;
  componentInstance.type = ComponentFunction;
  componentInstance.status = 'created';
  componentInstance.cleanups = [];
  componentInstance.useEffectsInitialCount = 0;
  componentInstance.useStatesInitialCount = 0;
  componentInstance.useEffectsCurrentCount = 0;
  componentInstance.useStatesCurrentCount = 0;

  return componentInstance;
}
