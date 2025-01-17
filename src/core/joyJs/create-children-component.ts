import { Joy } from '../../JoyJS.js'
import { checkSameProps } from '../../utils/checkSameProps.ts'

type ComponentInstance = {
  element?: HTMLElement;
  childrenIndex: number;
  childrenComponents?: Record<number, JoyComponentInstance>;
};

type JoyComponentInstance = {
  type: Function;
  props: Record<string, any>;
  renderJoy: { refresh: () => void };
};

type Props = Record<string, any>;

type ComponentFunction = (props: Props) => any;

export function createChildComponent(
  componentInstance: ComponentInstance,
  ChildrenComponentFunction: ComponentFunction,
  props: Props
): JoyComponentInstance {
  if (!componentInstance?.element) {
    throw new Error('componentInstance.element is not defined.')
  }

  componentInstance.childrenIndex++
  const cachedComponentInstance =
    componentInstance.childrenComponents?.[componentInstance.childrenIndex]

  if (cachedComponentInstance) {
    const isComponentSameTypeAsItWas =
      cachedComponentInstance.type === ChildrenComponentFunction

    if (isComponentSameTypeAsItWas) {
      return getUpdatedComponent(cachedComponentInstance, props)
    }

    delete componentInstance.childrenComponents?.[componentInstance.childrenIndex]
  }

  return Joy.create(ChildrenComponentFunction, props, {
    parentInstance: componentInstance,
  })
}

function getUpdatedComponent(
  cachedComponentInstance: JoyComponentInstance,
  props: Props
): JoyComponentInstance {
  if (checkSameProps(props, cachedComponentInstance.props)) {
    return cachedComponentInstance
  }

  cachedComponentInstance.props = props
  cachedComponentInstance.renderJoy.refresh()

  return cachedComponentInstance
}
