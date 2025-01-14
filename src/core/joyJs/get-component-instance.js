export function getComponentInstance(ComponentFunction, props, componentJoy) {
    const componentInstance = ComponentFunction(props, {joy: componentJoy})
    componentInstance.type = ComponentFunction

    return componentInstance
}
