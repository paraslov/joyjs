import { CacheKeyType, CacheManager } from '../joyJs/children-cache-manager.ts';

export type JoyComponent<P = any> = ((props: P, options: { joy: ComponentJoy }) => any) & {
  render?: (
    options: RenderOptions
  ) => void;
};

export type JoyProps = Record<string, any>;

export type JoyCreateOptions = { parentInstance?: ParentInstance, key?: CacheKeyType }
export type RenderJoyCreateOptions = Omit<JoyCreateOptions, 'parentInstance'>

export type ComponentInstance = {
  renderJoy: RenderJoy;
  element: HTMLElement;
  childrenComponents: CacheManager<ComponentInstance>;
  cleanup?: () => void;
  props?: JoyProps;
  type: JoyComponent;
};

export type ParentInstance = ComponentInstance | null;

export type ReducerType<T> = (newState: T) => T
export type SetStateFunction<T> = (prevState: T | ReducerType<T>) => void;
export type ComponentJoy = {
  useState: <T>(initialState: T) => [T, SetStateFunction<T>];
};

export type RenderJoy = {
  create: (ChildrenComponentFunction: JoyComponent, props?: any, options?: RenderJoyCreateOptions) => ComponentInstance,
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
