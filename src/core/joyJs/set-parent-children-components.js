export function setParentChildrenComponents(parentInstance, componentInstance) {
  if (!parentInstance.childrenComponents)
    parentInstance.childrenComponents = [];

  parentInstance.childrenComponents[parentInstance.childrenIndex] =
    componentInstance;
}
