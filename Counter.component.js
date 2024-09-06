export function CounterComponent(props, { joy }) {
  console.log('CounterComponent mount')

  const element = document.createElement('div')

  const localState = {
    count: 1,
  }

  const interval = setInterval(() => {
    localState.count++
    joy.refresh()
  }, 1000)

  return {
    element,
    localState,
    cleanup: function () {
      clearInterval(interval)
    },
  }
}

CounterComponent.render = ({ element, localState }) => {
  console.log('CounterComponent render')

  element.append(localState.count)
}
