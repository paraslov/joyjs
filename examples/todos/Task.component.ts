import { JoyComponent } from '../../src/core/types/core-types';

export type TaskComponentProps = {
  task: TaskType;
  setIsDone: (taskId: number, value: boolean) => void;
  deleteTask: () => void;
}

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
}

export const TaskComponent: JoyComponent<TaskComponentProps> = ({ props, joy }) => {
  console.log('TaskComponent render');
  joy.createRoot('li');

  joy.create('span', { children: [props.task.title] });
  joy.create('input', {
    type: 'checkbox',
    checked: props.task.isDone,
    onChange: (e: any) => {
      props.setIsDone(props.task.id, e.currentTarget.checked);
    },
  });
  joy.create('button', {
    type: 'button',
    children: ['x'],
    onClick: () => {
      props.deleteTask(props.task.id);
    }
  });
};
