import { TaskComponent } from "./Task.component.js";

export function TodolistComponent(props, { joy }) {
  console.log('TodolistComponent mount')

  const element = document.createElement('ul')

  const localState = {
    tasks: [
      { id: 1, title: 'Cat', isDone: false },
      { id: 2, title: 'Kitty', isDone: true },
      { id: 3, title: 'Pussy cat', isDone: false },
    ],
    setIsDone(taskId, isDone) {
      localState.tasks = localState.tasks.map((task) => task.id === taskId ? { ...task, isDone } : task)
      joy.refresh()
    },
    childrenComponents: [],
  }

  return {
    element,
    localState,
  }
}

TodolistComponent.render = ({ element, localState, joy }) => {
  console.log('TodolistComponent render')
  localState.childrenComponents.forEach(cc => cc.cleanup?.())
  localState.childrenComponents = []

  element.append('TODOLIST')

  for (let i = 0; i < localState.tasks.length; i++) {
    // const cachedComponent = localState.childrenComponents[i]

    // if (cachedComponent) {
    //   if (cachedComponent.props.task !== localState.tasks[i]) {
    //     cachedComponent.props.task = localState.tasks[i]
    //
    //     TaskComponent.render({
    //       element: cachedComponent.element,
    //       props: {
    //         task: localState.tasks[i],
    //         setIsDone: localState.setIsDone,
    //       }
    //     })
    //   }
    //
    //   element.append(cachedComponent.element)
    //   continue
    // }

    const taskInstance = joy.create(TaskComponent, { task: localState.tasks[i], setIsDone: localState.setIsDone })
    localState.childrenComponents.push(taskInstance)

    element.append(taskInstance.element)
  }
}
