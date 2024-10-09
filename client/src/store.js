// store.js
import {create} from 'zustand';

const useStore = create((set) => ({
  sidebarShow: false,
  sidebarUnfoldable: false,
  setSidebarShow: (show) => set({ sidebarShow: show }),
  toggleSidebarUnfoldable: () => set((state) => ({ sidebarUnfoldable: !state.sidebarUnfoldable })),
}));

export default useStore;
