import { JoyComponent } from '../../src/core/types/core-types';

export const FilterComponent: JoyComponent = function(_) {
  console.log('FilterComponent mount');

  return {};
}

FilterComponent.render = ({ props, joy }) => {
  console.log('FilterComponent render');
  joy._create('div');
  const { filter, setFilter } = props;

  const allButtonRef = joy.create('button', {
    children: ['All'],
    onClick: () => {
      setFilter('all');
    }
  });

  const doneButtonRef = joy.create('button', {
    children: ['Done'],
    onClick: () => {
      setFilter('done');
    }
  });

  const todoButtonRef = joy.create('button', {
    children: ['Todo'],
    onClick: () => {
      setFilter('todo');
    }
  });

  switch (filter) {
    case 'all':
      allButtonRef.style.background = 'lightgreen';
      break;
    case 'done':
      doneButtonRef.style.background = 'lightgreen';
      break;
    case 'todo':
      todoButtonRef.style.background = 'lightgreen';
      break;
  }
};
