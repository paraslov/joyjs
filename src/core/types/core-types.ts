export type JoyComponent<P = JoyProps> = ((props: P, options: { joy: ComponentJoy }) => any) & {
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

type SetStateAction<T> = T | ((prevState: T) => T);
export type ComponentJoy = {
  useState: <T>(initialState: T) => [T, (newState: SetStateAction<T>) => void];
};

export type RenderJoy = {
  create: (ChildrenComponentFunction: JoyComponent, props?: JoyProps) => ComponentInstance,
  refresh: RefreshFunction
}

export type RefreshFunction = () => void
export type ComponentStates = any[]

type RenderOptions = {
  joy: RenderJoy,
  element: HTMLElement,
  props?: JoyProps,
  componentStates?: ComponentStates[],
};
