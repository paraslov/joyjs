export type JoyComponent<P = any> = ((props: P, options: { joy: ComponentJoy }) => any) & {
  render?: (
    options: RenderOptions
  ) => void;
};

export type JoyProps = Record<string, any>;

export type ComponentInstance = {
  renderJoy: RenderJoy;
  element: HTMLElement;
  childrenComponents: ComponentInstance[];
  cleanup?: () => void;
  props?: JoyProps;
  childrenIndex: number;
  type: JoyComponent;
};

export type ParentInstance = ComponentInstance | null;

export type ReducerType<T> = (newState: T) => T
export type SetStateFunction<T> = (prevState: T | ReducerType<T>) => void;
export type ComponentJoy = {
  useState: <T>(initialState: T) => [T, SetStateFunction<T>];
};

export type RenderJoy = {
  create: (ChildrenComponentFunction: JoyComponent, props?: any) => ComponentInstance,
  refresh: RefreshFunction
}

export type RefreshFunction = () => void
export type ComponentStates = any[]

type RenderOptions = {
  joy: RenderJoy,
  element: HTMLElement,
  componentStates: ComponentStates[],
  props?: any,
};
