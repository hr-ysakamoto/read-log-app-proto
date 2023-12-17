import { create } from 'zustand';

interface AppGlobalState {
  draggingItemId: string | null;
  setDraggingItem: (id: string | null) => void;
}

export const useStore = create<AppGlobalState>(set => ({
  draggingItemId: null,
  setDraggingItem: (id: string | null) => {
    set(() => ({ draggingItemId: id }));
  },
}));
