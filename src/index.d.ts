export type Update<T> = ((v: T) => T) | T;

export type SetGlobalState<S> = <N extends keyof S>(
  name: N,
  update: Update<S[N]>,
) => void;

export type HookResult<T> = [T, (u: Update<T>) => void];

export type Reducer<S, A> = (state: S, action: A) => S;

export type Dispatch<A> = (action: A) => A;

export type UseGlobalState<S> = <N extends keyof S>(name: N) => HookResult<S[N]>;

export type Store<S, A> = {
  useGlobalState: UseGlobalState<S>,
  getState: () => S,
  dispatch: Dispatch<A>,
};

export type StoreCreator<S, A> = (reducer: Reducer<S, A>, initialState: S) => Store<S, A>;

export type Enhancer<S, A> = (creator: StoreCreator<S, A>) => StoreCreator<S, A>;

export type CreateGlobalState = <S extends {}, A extends {}>(initialState: S) => {
  useGlobalState: UseGlobalState<S>,
  setGlobalState: SetGlobalState<S>,
};

export type CreateStore = <S extends {}, A extends {}>(
  reducer: Reducer<S, A>,
  initialState: S,
  enhancer?: Enhancer<S, A>,
) => Store<S, A>;

export const createGlobalState: CreateGlobalState;
export const createStore: CreateStore;

// for patch redux

export type MiddlewareAPI<S, A> = {
  getState: () => S,
  dispatch: Dispatch<A>,
};

export type Middleware<S, A> =
  (store: MiddlewareAPI<S, A>) => (next: Dispatch<A>) => (action: A) => A;

export type ApplyMiddleware<S, A> = (...args: Array<Middleware<S, A>>) => Enhancer<S, A>;
