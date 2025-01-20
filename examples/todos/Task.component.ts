import { JoyComponent } from '../../src/core/types/core-types';

export type TaskComponentProps = {
  task: TaskType;
  setIsDone: () => void;
  deleteTask: () => void;
}

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
}

export const TaskComponent: JoyComponent<TaskComponentProps> = function(props) {
  console.log('TaskComponent mount');
  const element = document.createElement('li');

  return {
    element,
    props,
    cleanup: function () {
      console.log('task:execute:cleanup');
    },
  };
}

TaskComponent.render = ({element, props}) => {
  console.log('TaskComponent render');
  if (!props) return;

  element.append(props.task.title);

  const isDoneElement = document.createElement('input');
  isDoneElement.type = 'checkbox';
  isDoneElement.checked = props.task.isDone;

  isDoneElement.addEventListener('change', () => {
    props.setIsDone(props.task.id, isDoneElement.checked);
  });

  const deleteTaskButton = document.createElement('button');
  deleteTaskButton.innerText = 'x';

  deleteTaskButton.addEventListener('click', () => {
    props.deleteTask(props.task.id);
  });

  element.append(isDoneElement);
  element.appendChild(deleteTaskButton);
};
