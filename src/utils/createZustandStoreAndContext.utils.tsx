import { createContext, type PropsWithChildren, useContext, useRef } from "react";
import { createStore, type StateCreator, type StoreApi, type StoreMutators, useStore as useZustandStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createExpiringStorage } from "./expiring-storage";

export type StateCreatorFn<T> = StateCreator<T, [], Array<[keyof StoreMutators<unknown, unknown>, unknown]>>;

/**
 * Creates a Zustand store bound to React Context, allowing initialization via
 * Provider props.
 *
 * This function sets up a Zustand store instance managed within React Context.
 * It generates a Provider component that accepts an `initialState` prop,
 * enabling dynamic configuration of the store's initial state when the Provider
 * mounts. This is particularly useful when the initial state comes from
 * external sources (like a CMS) or component props.
 *
 * Adheres to the React Context pattern from the Zustand documentation:
 * https://github.com/pmndrs/zustand?tab=readme-ov-file#react-context
 *
 * Provides similar dependency injection capabilities as libraries like
 * `zustand-di` directly through the generated Provider component. Without
 * requiring you to manually create another Context Provider. Useful for testing
 * and Storybook setup.
 *
 * @example
 * 	<TrafficFilterStoreProvider
 * 		initialState={{ filter: [appConfig.applicationType] }}
 * 	>
 * 		<FilterComponent />
 * 	</TrafficFilterStoreProvider>;
 */
export function createZustandStoreAndContext<T extends Record<string, any>>(stateCreatorFn: StateCreatorFn<T>, devtoolsName: string) {
  const StoreContext = createContext<null | StoreApi<T>>(null);

  /** Provider component to wrap the application and provide the store */
  function Provider({ children, initialState, enablePersist }: PropsWithChildren<{ initialState?: Partial<T>; enablePersist?: boolean }>) {
    const storeRef = useRef<StoreApi<T>>(null);

    /** Initializes the store only once, when the component is mounted. */
    if (enablePersist) {
      storeRef.current ??= InitializeStore(
        persist(stateCreatorFn, {
          name: devtoolsName,
          partialize: ({ actions, ...state }: T) => ({ ...state }),
          storage: createExpiringStorage<Omit<T, "actions">>(),
        }),
        devtoolsName,
        initialState
      );
    } else {
      storeRef.current ??= InitializeStore(stateCreatorFn, devtoolsName, initialState);
    }

    return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
  }

  function useStoreContext(): StoreApi<T> {
    const context = useContext(StoreContext);

    if (!context) {
      throw new Error(`Context accessed outside the ${devtoolsName} context,` + ` make sure to wrap the component with the store provider`);
    }

    return context;
  }

  /**
   * Hook to access the store and select a part of the state.
   *
   * @example
   * 	const useTrafficFilters = () => useStore((state) => state.filter);
   */
  function useStore<S>(selector: (state: T) => S): S {
    const store = useStoreContext();
    return useZustandStore(store, selector);
  }

  return {
    Provider,
    useStore,
  };
}

/** Initialize the store with the provided initial state. */
export function InitializeStore<T>(stateCreatorFn: StateCreatorFn<T>, devtoolsName: string, initialState: Partial<T> = {}): StoreApi<T> {
  return createStore<T>()(
    devtools<T>(
      (set, get, api) => ({
        ...stateCreatorFn(set, get, api),
        ...initialState,
      }),
      { name: devtoolsName }
    )
  );
}
