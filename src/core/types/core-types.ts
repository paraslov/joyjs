import { CacheKeyType, CacheManager } from '../joyJs/children-cache-manager.ts';
import { TagNamesMap } from '../joyJs/createHtmlElement.ts';

export type JoyComponent<P = any> = ({ props: P, joy: ComponentJoy }) => any

export type JoyProps = Record<string, any>;

export type JoyCreateOptions = { parentInstance?: ParentInstance, key?: CacheKeyType }
export type RenderJoyCreateOptions = Omit<JoyCreateOptions, 'parentInstance'>

export type ComponentInstance = {
  renderJoy: RenderJoy;
  element: HTMLElement;
  childrenComponents: CacheManager<ComponentInstance>;
  status: 'created' | 'mounted' | 'first-render' | 'other';
  useStatesIndex: number;
  useEffectsIndex: number;
  prevDeps: any[];
  cleanups: (() => void)[];
  props?: JoyProps;
  type: JoyComponent;
};

export type ParentInstance = ComponentInstance | null;

export type ReducerType<T> = (newState: T) => T
export type SetStateFunction<T> = (prevState: T | ReducerType<T>) => void;
export type UseEffectCallbackFn = () => (() => void) | void

export type RenderJoy = {
  create: <T extends TagNamesMap | JoyComponent>(
    tagNameOrComponentFn: T,
    props?: any,
    options?: RenderJoyCreateOptions
  ) => T extends TagNamesMap ? HTMLElement : ComponentInstance;
  refresh: RefreshFunction;
  useState: <T>(initialState: T) => [T, SetStateFunction<T>];
  useEffect: (cb: UseEffectCallbackFn, deps: any[]) => void;
  createRoot: (tagName: TagNamesMap, props?: any) => HTMLElement;
}

export type RefreshFunction = () => void
export type ComponentStates = Array<[any, SetStateFunction<any>]>
