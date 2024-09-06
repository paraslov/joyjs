export function TaskComponent(props) {
  console.log('TaskComponent mount')
  const element = document.createElement('li')

  TaskComponent.render({ element, props })

  return {
    element,
    props,
    cleanup: function () {
      console.log('task:execute:cleanup')
    }
  }
}

TaskComponent.render = ({ element, props, localState }) => {
  console.log('TaskComponent render')
  element.innerHTML = ''

  element.append(props.task.title)

  const isDoneElement = document.createElement('input')
  isDoneElement.type = 'checkbox'
  isDoneElement.checked = props.task.isDone

  isDoneElement.addEventListener('change', () => {
    props.setIsDone(props.task.id, isDoneElement.checked)
  })

  element.append(isDoneElement)
}
