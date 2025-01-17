import { TaskComponent } from './Task.component.js';
import { FilterComponent } from './Filter.component.js';

export function TodolistComponent(props, { joy }) {
  console.log('TodolistComponent mount');

  const element = document.createElement('ul');

  joy.useState([
    { id: 1, title: 'Cat', isDone: false },
    { id: 2, title: 'Kitty', isDone: true },
    { id: 3, title: 'Pussy cat', isDone: true },
  ]);
  joy.useState('all');

  return {
    element,
  };
}

TodolistComponent.render = ({ element, componentStates, joy }) => {
  console.log('TodolistComponent render');
  const [tasks, setTasks] = componentStates[0];
  const [filter, setFilter] = componentStates[1];

  const setIsDone = (taskId, isDone) => {
    setTasks(
      prev => prev.map((task) => (task.id === taskId ? { ...task, isDone } : task)),
    );
  };
  element.append('TODOLIST');

  let tasksForRender = tasks;

  switch (filter) {
    case 'done':
      tasksForRender = tasks.filter((t) => t.isDone);
      break;
    case 'todo':
      tasksForRender = tasks.filter((t) => !t.isDone);
  }

  for (let i = 0; i < tasksForRender.length; i++) {
    const task = tasksForRender[i];
    const taskInstance = joy.create(TaskComponent, {
      task,
      setIsDone: setIsDone,
    });

    element.append(taskInstance.element);
  }

  const filterInstance = joy.create(FilterComponent, { filter, setFilter });
  element.append(filterInstance.element);
};
