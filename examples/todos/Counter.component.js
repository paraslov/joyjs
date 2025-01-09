export function CounterComponent(props, { joy }) {
  console.log('CounterComponent mount')

  const element = document.createElement('div')

  const [_, setState] = joy.useState(1)

  const interval = setInterval(() => {

    setState((prev) => {
      return prev + 1
    })
  }, 1000)

  return {
    element,
    cleanup: function () {
      clearInterval(interval)
    },
  }
}

CounterComponent.render = ({ element, componentStates }) => {
  const [state] = componentStates[0]
  console.log('CounterComponent render')

  element.append(state)
}
