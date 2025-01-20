import { TaskComponent } from './Task.component';
import { FilterComponent } from './Filter.component';
import { AddItemComponent } from './AddItem.component';
import { JoyComponent } from '../../src/core/types/core-types';

export const TodolistComponent: JoyComponent = function(_, { joy }) {
  console.log('TodolistComponent mount');

  const element = document.createElement('ul');

  joy.useState([
    { id: 1, title: 'Cat', isDone: false },
    { id: 2, title: 'Kitty', isDone: true },
    { id: 3, title: 'Pussy cat', isDone: true }
  ]);
  joy.useState('all');

  return {
    element
  };
};

TodolistComponent.render = ({ element, componentStates, joy }) => {
  console.log('TodolistComponent render');
  const [tasks, setTasks] = componentStates[0];
  const [filter, setFilter] = componentStates[1];

  const setIsDone = (taskId: number, isDone: boolean) => {
    setTasks(
      (prev: any) => prev.map((task: any) => (task.id === taskId ? { ...task, isDone } : task))
    );
  };
  const addTask = (title: string) => {
    setTasks(
      (prev: any) => [...prev, { id: Date.now(), title, isDone: false }]
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks(
      (prev: any) => prev.filter((t: any) => t.id !== taskId)
    );
  };

  element.append('TODOLIST');
  const addItemInstance = joy.create(AddItemComponent, { addItem: addTask });
  element.append(addItemInstance.element);

  let tasksForRender = tasks;

  switch (filter) {
    case 'done':
      tasksForRender = tasks.filter((t: any) => t.isDone);
      break;
    case 'todo':
      tasksForRender = tasks.filter((t: any) => !t.isDone);
  }

  for (let i = 0; i < tasksForRender.length; i++) {
    const task = tasksForRender[i];
    const taskInstance = joy.create(TaskComponent, {
      task,
      setIsDone,
      deleteTask
    }, { key: task.id });

    element.append(taskInstance.element);
  }

  const filterInstance = joy.create(FilterComponent, { filter, setFilter });
  element.append(filterInstance.element);
};
