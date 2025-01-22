import { CacheKeyType, CacheManager } from '../joyJs/children-cache-manager.ts';
import { TagNamesMap } from '../joyJs/createHtmlElement.ts';

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
  status: 'created' | 'mounted' | 'first-render' | 'other';
  useStatesIndex: number;
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
  create: <T extends TagNamesMap | JoyComponent>(
    tagNameOrComponentFn: T,
    props?: any,
    options?: RenderJoyCreateOptions
  ) => T extends TagNamesMap ? HTMLElement : ComponentInstance;
  refresh: RefreshFunction;
  useState: <T>(initialState: T) => [T, SetStateFunction<T>];
  _create: (tagName: TagNamesMap, props?: any) => HTMLElement;
}

export type RefreshFunction = () => void
export type ComponentStates = Array<[any, SetStateFunction<any>]>

type RenderOptions = {
  joy: RenderJoy,
  element: HTMLElement,
  componentStates: ComponentStates[],
  props?: any,
};
