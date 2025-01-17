import { Joy } from '../../JoyJS.js';
import { checkSameProps } from '../../utils/checkSameProps.ts';

export function createChildComponent(
  componentInstance,
  ChildrenComponentFunction,
  props,
) {
  if (!componentInstance?.element) {
    throw new Error('componentInstance.element is not defined.');
  }

  componentInstance.childrenIndex++;
  const cachedComponentInstance =
    componentInstance.childrenComponents?.[componentInstance.childrenIndex];

  if (cachedComponentInstance) {
    const isComponentSameTypeAsItWas =
      cachedComponentInstance.type === ChildrenComponentFunction;

    if (isComponentSameTypeAsItWas) {
      return getUpdatedComponent(cachedComponentInstance, props);
    }

    delete componentInstance.childrenComponents[
      componentInstance.childrenIndex
    ];
  }

  return Joy.create(ChildrenComponentFunction, props, {
    parentInstance: componentInstance,
  });
}

function getUpdatedComponent(cachedComponentInstance, props) {
  if (checkSameProps(props, cachedComponentInstance.props)) {
    return cachedComponentInstance;
  }

  cachedComponentInstance.props = props;
  cachedComponentInstance.renderJoy.refresh();

  return cachedComponentInstance;
}
