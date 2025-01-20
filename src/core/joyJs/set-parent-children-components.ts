import { ComponentInstance } from '../types/core-types.ts';
import { CacheKeyType, CacheManager } from './children-cache-manager.ts';

export function setParentChildrenComponents(parentInstance: ComponentInstance, componentInstance: ComponentInstance, key?: CacheKeyType) {
  if (!parentInstance.childrenComponents)
    parentInstance.childrenComponents = new CacheManager();

  parentInstance.childrenComponents.addItem(componentInstance, componentInstance.type, key)
}
