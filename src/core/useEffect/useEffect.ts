import { ComponentInstance, UseEffectCallbackFn } from '../types/core-types.ts';

export function useEffectFactory(componentInstance: ComponentInstance, cb: UseEffectCallbackFn, deps = []) {
  componentInstance.useEffectsIndex++;

  if (!componentInstance.prevDeps) {
    componentInstance.prevDeps = [];
  }

  const effectIndex = componentInstance.useEffectsIndex;
  const prevDeps = componentInstance.prevDeps;

  if (componentInstance.status === 'first-render') {
    runFirstRenderEffect(componentInstance, cb, deps, effectIndex);
    return;
  }

  const hasChanged = !prevDeps || deps.some((d, i) => d !== prevDeps[i]);
  if (hasChanged) {
    runReRenderEffect(componentInstance, cb, deps, effectIndex)
  }
}

function runFirstRenderEffect(componentInstance: ComponentInstance, cb: UseEffectCallbackFn, deps: any[], effectIndex: number) {
  const cleanupFn = cb();

  if (cleanupFn) {
    componentInstance.cleanups[effectIndex] = cleanupFn;
  }

  componentInstance.prevDeps[effectIndex] = deps;
}

function runReRenderEffect(componentInstance: ComponentInstance, cb: UseEffectCallbackFn, deps: any[], effectIndex: number) {
  componentInstance.cleanups[effectIndex]?.();

  const cleanupFn = cb();
  if (cleanupFn) {
    componentInstance.cleanups[effectIndex] = cleanupFn;
  }

  componentInstance.prevDeps[effectIndex] = deps;
}
