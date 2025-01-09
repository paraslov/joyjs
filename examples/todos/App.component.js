import { CounterComponent } from "./Counter.component.js";
import { TodolistComponent } from "./Todolist.component.js";

export function AppComponent(_, { joy }) {
  const element = document.createElement('div')
  joy.useState('todolist')

  return {
    element,
  }
}

AppComponent.render = ({ element, componentStates, joy }) => {
  console.log('App render')

  const [page, setPage] = componentStates[0]

  const pageSelector = document.createElement('select')

  const counterPageOption = document.createElement('option')
  counterPageOption.append('Counter Page')
  counterPageOption.value = 'counter'

  const todolistOption = document.createElement('option')
  todolistOption.append('Todo List App')
  todolistOption.value = 'todolist'

  pageSelector.append(counterPageOption, todolistOption)
  pageSelector.value = page

  element.append(pageSelector)

  pageSelector.addEventListener("change", () => {
    setPage(pageSelector.value)
  })

  switch (page) {
    case 'counter': {
      const counterInstance = joy.create(CounterComponent)

      element.append(counterInstance.element)

      break
    }
    case 'todolist': {
      const todolistInstance = joy.create(TodolistComponent)

      element.append(todolistInstance.element)

      break
    }
  }
}
