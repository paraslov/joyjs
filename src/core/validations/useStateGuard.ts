import { JoyJsError } from './validations.ts';

export function useStateGuard(firstRenderCallsCount: number, stateIndex: number, componentName: string) {
  if (stateIndex !== firstRenderCallsCount) {
    throw new JoyJsError(`Should have same count of useState calls as at first render: ${ componentName }`);
  }
}
