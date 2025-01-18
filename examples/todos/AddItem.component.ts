import { JoyComponent } from '../../src/core/types/core-types';

export const AddItemComponent: JoyComponent = function(props) {
  console.log('AddItemComponent mount');

  const element = document.createElement('div');

  return {
    element,
    props,
  };
}

AddItemComponent.render = ({ element, props }) => {
  console.log('AddItemComponent render');
  const addItemInput = document.createElement('input');
  addItemInput.type = 'text';

  const addItemButton = document.createElement('button');
  addItemButton.type = 'button';
  addItemButton.innerText = 'Add Item +';
  addItemButton.addEventListener('click', () => {
    props.addItem(addItemInput.value);
    addItemInput.value = '';
  })

  element.appendChild(addItemInput);
  element.appendChild(addItemButton);
};
