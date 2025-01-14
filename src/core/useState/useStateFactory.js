export function useStateFactory(initialState, componentStates, refreshComponent) {
    const state = { value: initialState }

    const setStateFunction = (newState) => {
        if (typeof newState === 'function') {
            state.value = newState(state.value)
        } else {
            state.value = newState
        }
        refreshComponent()
    }

    componentStates.push([state, setStateFunction])
    return [state.value, setStateFunction]
}
