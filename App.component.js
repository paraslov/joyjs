import { CounterComponent } from "./Counter.component.js";

export function AppComponent() {
  const element = document.createElement('div')

  const localState = {
    page: 'todolist',
  }

  AppComponent.render({ element, localState })

  return {
    localState,
    element,
    // cleanUp: () => {},
  }
}

AppComponent.render = ({element, localState, props, liba}) => {
  console.log('App render')

  const pageSelector = document.createElement('select')

  const counterPageOption = document.createElement('option')
  counterPageOption.append('Counter Page')
  counterPageOption.value = 'counter'

  const todolistOption = document.createElement('option')
  todolistOption.append('Todo List App')
  todolistOption.value = 'todolist'

  pageSelector.append(counterPageOption, todolistOption)
  pageSelector.value = localState.page

  element.append(pageSelector)

  pageSelector.addEventListener("change", () => {
    localState.page = pageSelector.value

    AppComponent.render({element, localState})
  })

  switch (localState.page) {
    case 'counter': {
      const counterInstance = CounterComponent()
      element.append(counterInstance.element)

      break
    }
    case 'todolist': {
      const todolistInstance = 'TODOLIST'
      element.append(todolistInstance)

      break
    }
  }
}
