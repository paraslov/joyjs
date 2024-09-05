export function CounterComponent() {
  console.log('CounterComponent mount')

  const element = document.createElement('div')

  const localState = {
    count: 1,
  }

  const interval = setInterval(() => {
    localState.count++
    CounterComponent.render({ element, localState })
  }, 1000)

  return {
    element,
    localState,
  }
}

CounterComponent.render = ({ element, localState }) => {
  console.log('CounterComponent render')
  element.append(localState.count)
}
