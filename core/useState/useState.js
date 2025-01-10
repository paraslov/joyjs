export function useStatFactory(states, componentStates, renderJoy) {
    return function (initialState) {
        const state = { value: initialState }
        states.value.push(state)

        const setStateFunction = (newState) => {
            if (typeof newState === 'function') {
                state.value = newState(state.value)
            } else {
                state.value = newState
            }
            renderJoy.refresh()
        }

        componentStates.push([state, setStateFunction])
        return [state.value, setStateFunction]
    }
}
