import { CounterComponent } from './Counter.component';
import { TodolistComponent } from './Todolist.component';
import { JoyComponent } from '../../src/core/types/core-types';

export const AppComponent: JoyComponent = function (_, { joy }) {
  joy.create('div');
  joy.useState('todolist');

  return {};
};

AppComponent.render = ({ componentStates, joy }) => {
  console.log('App render');

  const [page, setPage] = componentStates[0];

  joy.create('select', {
    value: page,
    children: [
      joy.create('option', {
        value: 'counter',
        children: ['Counter Page']
      }),
      joy.create('option', {
        value: 'todolist',
        children: ['Todo List App']
      }),
    ],
    onChange: (e: any) => {
      setPage(e.target.value);
    },
  });

  if (page === 'todolist') {
    joy.create(TodolistComponent);
  } else if (page === 'counter') {
    joy.create(CounterComponent, {}, {key: Date.now()});
  }
};
