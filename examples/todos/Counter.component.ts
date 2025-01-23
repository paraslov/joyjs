import { JoyComponent } from '../../src/core/types/core-types';

export const CounterComponent: JoyComponent = ({joy }) => {
  console.log('CounterComponent render');
  joy.createRoot('div');

  const [count, setCount] = joy.useState(1);

  joy.useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval)
    }
  }, [])

  joy.create('span', { children: [`Counter Component: ${count}`] });
};
