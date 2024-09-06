import { CounterComponent } from "./Counter.component.js";
import { TodolistComponent } from "./Todolist.component.js";

export function AppComponent() {
  const element = document.createElement('div')

  const localState = {
    page: 'todolist',
    childrenComponents: [],
  }

  return {
    localState,
    element,
    // cleanUp: () => {},
  }
}

AppComponent.render = ({ element, localState, joy }) => {
  console.log('App render')

  localState.childrenComponents.forEach(cc => cc.cleanup?.())
  localState.childrenComponents = []

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

    joy.refresh()
  })

  switch (localState.page) {
    case 'counter': {
      const counterInstance = joy.create(CounterComponent)
      localState.childrenComponents.push(counterInstance)

      element.append(counterInstance.element)

      break
    }
    case 'todolist': {
      const todolistInstance = joy.create(TodolistComponent)
      localState.childrenComponents.push(todolistInstance)

      element.append(todolistInstance.element)

      break
    }
  }
}
