import {renderComponent} from "./render-component.js";

export function refreshComponent(componentInstance, componentStates) {
    if (!componentInstance?.element) {
        throw new Error('componentInstance.element is not defined.')
    }

    componentInstance.element.innerHTML = ''

    if (componentInstance.childrenComponents) {
        componentInstance.childrenComponents.forEach(cc => cc.cleanup?.())
    }

    renderComponent(componentInstance, componentStates)
}
