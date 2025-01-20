import {
  ComponentStates,
  ReducerType,
  RefreshFunction,
  SetStateFunction
} from '../types/core-types.ts';

export function useStateFactory<T>(
  initialState: T,
  componentStates: ComponentStates,
  refreshComponent: RefreshFunction,
): [T, SetStateFunction<T>] {
  const state = { value: initialState };

  const setStateFunction = (reducer: T | ReducerType<T>) => {
    if (isReducer<T>(reducer)) {
      state.value = reducer(state.value);
    } else {
      state.value = reducer as T;
    }

    refreshComponent();
  };

  componentStates.push([state, setStateFunction]);
  return [state.value, setStateFunction];
}

function isReducer<T>(func: any): func is ReducerType<T> {
  return typeof func === 'function';
}
