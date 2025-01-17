import { ComponentInstance } from '../types/core-types.ts';

export function setParentChildrenComponents(parentInstance: ComponentInstance, componentInstance: ComponentInstance) {
  if (!parentInstance.childrenComponents)
    parentInstance.childrenComponents = [];

  parentInstance.childrenComponents[parentInstance.childrenIndex] =
    componentInstance;
}
