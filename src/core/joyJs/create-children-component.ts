import { Joy } from '../../JoyJS.js';
import { checkSameProps } from '../../utils/checkSameProps.ts';
import { JoyComponent, ComponentInstance, JoyProps } from '../types/core-types.ts';
import { CacheKeyType } from './children-cache-manager.ts';

export function createChildComponent(
  componentInstance: ComponentInstance,
  ChildrenComponentFunction: JoyComponent,
  props?: JoyProps,
  options?: { key?: CacheKeyType }
): ComponentInstance {
  if (!componentInstance?.element) {
    throw new Error('componentInstance.element is not defined.');
  }

  const key = options?.key;
  const cachedComponentInstance = componentInstance.childrenComponents?.getItem(ChildrenComponentFunction, key);

  if (cachedComponentInstance) {
    const isComponentSameTypeAsItWas =
      cachedComponentInstance.type === ChildrenComponentFunction;

    if (isComponentSameTypeAsItWas) {
      return getUpdatedComponent(cachedComponentInstance, props);
    }

    componentInstance.childrenComponents?.deleteItem(ChildrenComponentFunction, key);
  }

  return Joy.create(ChildrenComponentFunction, props, {
    parentInstance: componentInstance,
    key
  });
}

function getUpdatedComponent(
  cachedComponentInstance: ComponentInstance,
  props?: JoyProps
): ComponentInstance {
  if (checkSameProps(props ?? null, cachedComponentInstance.props ?? null)) {
    return cachedComponentInstance;
  }

  cachedComponentInstance.props = props;
  cachedComponentInstance.renderJoy.refresh();

  return cachedComponentInstance;
}
