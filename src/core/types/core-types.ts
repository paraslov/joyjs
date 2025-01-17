export type ComponentFunction = ((props: Record<string, any>, options: { joy: ComponentJoy }) => any) & {
  render?: (
    options: RenderOptions
  ) => void;
};

export type Props = Record<string, any>;

export type ComponentInstance = {
  renderJoy: RenderJoy;
  element: HTMLElement;
  childrenComponents: ComponentInstance[];
  cleanup?: () => void;
  props?: Props;
  childrenIndex: number;
  type: ComponentFunction;
  localState?: Props;
};

export type ParentInstance = ComponentInstance | null;

export type ComponentJoy = {
  useState: <T>(initialState: T) => [T, (newState: T) => void];
};

export type RenderJoy = {
  create: (ChildrenComponentFunction: ComponentFunction, props?: Props) => ComponentInstance,
  refresh: RefreshFunction
}

export type RefreshFunction = () => void
export type ComponentStates = any[]

type RenderOptions = {
  joy: RenderJoy,
  element: HTMLElement,
  localState?: Props,
  props?: Props,
  componentStates?: ComponentStates[],
};
