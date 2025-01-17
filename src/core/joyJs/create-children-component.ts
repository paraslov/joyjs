import { Joy } from '../../JoyJS.js';
import { checkSameProps } from '../../utils/checkSameProps.ts';
import { ComponentFunction, ComponentInstance, Props } from '../types/core-types.ts';

export function createChildComponent(
  componentInstance: ComponentInstance,
  ChildrenComponentFunction: ComponentFunction,
  props?: Props
): ComponentInstance {
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

    delete componentInstance.childrenComponents?.[componentInstance.childrenIndex];
  }

  return Joy.create(ChildrenComponentFunction, props, {
    parentInstance: componentInstance,
  });
}

function getUpdatedComponent(
  cachedComponentInstance: ComponentInstance,
  props?: Props
): ComponentInstance {
  if (checkSameProps(props ?? null, cachedComponentInstance.props ?? null)) {
    return cachedComponentInstance;
  }

  cachedComponentInstance.props = props;
  cachedComponentInstance.renderJoy.refresh();

  return cachedComponentInstance;
}
