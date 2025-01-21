import { JoyComponent } from '../../src/core/types/core-types';

export const CounterComponent: JoyComponent = function(__, { joy }) {
  console.log('CounterComponent mount');
  joy.create('div');

  const [_, setState] = joy.useState(1);

  const interval = setInterval(() => {
    setState((prev) => {
      return prev + 1;
    });
  }, 1000);

  return {
    cleanup: function () {
      clearInterval(interval);
    },
  };
}

CounterComponent.render = ({componentStates, joy }) => {
  const [state] = componentStates[0];
  console.log('CounterComponent render');

  joy.create('span', { children: [`Counter Component: ${state}`] });
};
