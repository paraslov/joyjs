export class JoyJsError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function validateComponentFunction(componentFunction: any) {
  if (typeof componentFunction !== 'function') {
    throw new JoyJsError(`Your component should be a function "${componentFunction.name}"`);
  }
}

export function validateComponentInstance(component: any) {
  if (!(component.element instanceof Node)) {
    throw new JoyJsError(`Error in ${component.type.name} Each component function should return instance with element that is valid Node instance for example that created by document.createElement
        {
           ...
           element: document.createElement('div')
        }`);
  }
}
