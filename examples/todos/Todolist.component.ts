import { TaskComponent } from './Task.component';
import { FilterComponent } from './Filter.component';
import { AddItemComponent } from './AddItem.component';
import { JoyComponent } from '../../src/core/types/core-types';

export const TodolistComponent: JoyComponent = function(_, { joy }) {
  console.log('TodolistComponent mount');

  return {
    // element
  };
};

TodolistComponent.render = ({ componentStates, joy }) => {
  console.log('TodolistComponent render');
  joy._create('ul');

  const [tasks, setTasks] = joy.useState([
    { id: 1, title: 'Cat', isDone: false },
    { id: 2, title: 'Kitty', isDone: true },
    { id: 3, title: 'Pussy cat', isDone: true }
  ]);
  const [filter, setFilter] = joy.useState('all');

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

  joy.create('span', { children: ['TODOLIST'] });
  joy.create(AddItemComponent, { addItem: addTask });

  let tasksForRender = tasks;

  switch (filter) {
    case 'done':
      tasksForRender = tasks.filter((t: any) => t.isDone);
      break;
    case 'todo':
      tasksForRender = tasks.filter((t: any) => !t.isDone);
  }

  const mappedTasks = tasksForRender.map((task: any) => joy.create(TaskComponent, {
    task,
    setIsDone,
    deleteTask
  }, { key: task.id }));

  joy.create('ul', { children: mappedTasks });
  joy.create(FilterComponent, { filter, setFilter })
};
