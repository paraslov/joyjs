class JoyJsError extends Error {
  constructor(message) {
    super(message);
  }
}

export function validateComponentFunction(componentFunction) {
  if (typeof componentFunction.render !== 'function') {
    throw new JoyJsError(`You must declare render method for your function component "${componentFunction.name}"
Example: App.render = ({element, localState, props, joy}) => {}`);
  }
}

export function validateComponentInstance(component) {
  if (!(component.element instanceof Node)) {
    throw new JoyJsError(`Error in ${component.type.name} Each component function should return instance with element that is valid Node instance for example that created by document.createElement
        {
           ...
           element: document.createElement('div')
        }`);
  }
}
