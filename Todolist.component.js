import {TaskComponent} from './Task.component.js'

export function TodolistComponent(props, {joy}) {
  console.log('TodolistComponent mount')

  const element = document.createElement('ul')

  joy.useState([
    {id: 1, title: 'Cat', isDone: false},
    {id: 2, title: 'Kitty', isDone: true},
    {id: 3, title: 'Pussy cat', isDone: true},
  ])

  return {
    element,
  }
}

TodolistComponent.render = ({element, componentStates, joy}) => {
  console.log('TodolistComponent render')
  const [tasks, setTasks] = componentStates[0]

  const setIsDone = (taskId, isDone) => {
    setTasks(tasks.map((task) => task.id === taskId ? {...task, isDone} : task))
  }

  const tasksForRender = tasks
  element.append('TODOLIST')

  for (let i = 0; i < tasksForRender.length; i++) {
    const task = tasksForRender[i]
    const taskInstance = joy.create(TaskComponent, {task, setIsDone: setIsDone})

    element.append(taskInstance.element)
  }
}
