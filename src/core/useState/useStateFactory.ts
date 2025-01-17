import { ComponentStates, RefreshFunction } from '../types/core-types.ts';

export function useStateFactory(
  initialState: unknown,
  componentStates: ComponentStates,
  refreshComponent: RefreshFunction,
) {
  const state = { value: initialState };

  const setStateFunction = (newState) => {
    if (typeof newState === 'function') {
      state.value = newState(state.value);
    } else {
      state.value = newState;
    }
    refreshComponent();
  };

  componentStates.push([state, setStateFunction]);
  return [state.value, setStateFunction];
}
