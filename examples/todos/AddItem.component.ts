import { JoyComponent } from '../../src/core/types/core-types';

export const AddItemComponent: JoyComponent = function(_, { joy }) {
  console.log('AddItemComponent mount');
  joy.create('div');

  return {};
}

AddItemComponent.render = ({ props, joy }) => {
  console.log('AddItemComponent render');
  const addItemInputRef: any = joy.create('input', {
    type: 'text',
  });

  joy.create('button', {
    type: 'button',
    children: ['Add Item +'],
    onClick: () => {
      props.addItem(addItemInputRef.value);
      addItemInputRef.value = '';
    }
  });
};
