export function FilterComponent(props, {joy}) {
  console.log('FilterComponent mount')

  const element = document.createElement('div')

  return {
    element,
    props,
  }
}

FilterComponent.render = ({element, props}) => {
  console.log('FilterComponent render')
  const { filter, setFilter } = props

  const allButton = document.createElement('button')
  allButton.innerText = 'All'
  allButton.addEventListener('click', () => {
    setFilter('all')
  })

  const doneButton = document.createElement('button')
  doneButton.innerText = 'Done'
  doneButton.addEventListener('click', () => {
    setFilter('done')
  })

  const todoButton = document.createElement('button')
  todoButton.innerText = 'Todo'
  todoButton.addEventListener('click', () => {
    setFilter('todo')
  })

  switch (filter) {
    case 'all':
      allButton.style.background = 'lightgreen'
      break
    case 'done':
      doneButton.style.background = 'lightgreen'
      break
    case 'todo':
      todoButton.style.background = 'lightgreen'
      break
  }

  element.append(allButton, doneButton, todoButton)
}
