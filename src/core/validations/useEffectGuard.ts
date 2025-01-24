import { JoyJsError } from './validations.ts';

export function useEffectGuard(firstRenderCallsCount: number, effectIndex: number, componentName: string) {
  if (effectIndex !== firstRenderCallsCount) {
    throw new JoyJsError(`Should have same useEffect calls as at first render: ${ componentName }`);
  }
}
