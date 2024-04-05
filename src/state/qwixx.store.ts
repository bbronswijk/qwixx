import { createSelectors } from '@/state/create-selector';
import { devtools } from 'zustand/middleware';
import { create, StateCreator } from 'zustand';
import { Color, colors } from '@/data/tiles';
import { Change, State, Store } from '@/state/qwix.model';
import { checkTile, undo } from '@/state/qwixx.reducers';

const initialState: State  = {
  changes: [],
  [colors.red]: [],
  [colors.yellow]: [],
  [colors.green]: [],
  [colors.blue]: [],

  bonus: [],
  failed: 0,
}

const state: StateCreator<Store> = (set) => ({
  ...initialState,

  checkTile: (color: Color, bonus: boolean, value: number) => set((state): Partial<Store> => {
    return checkTile(state, color, bonus, value, true);
  }),

  roundFailed: () => set((state): Partial<Store> => ({
    failed: state.failed + 1,
    changes: [...state.changes, {failed: true, userAction: true,}],
  })),

  undo: () => set((state): Partial<Store> => {
    return undo({...state,}, [...state.changes].at(-1) as Change);
  }),
});

const useQwixxStore = createSelectors(create<Store>()(
  // persist(
    devtools(state, { store: 'QwixxStore', enabled: true }),
  //   { name: 'QwixxStore' }
  // )
));

export default useQwixxStore;
