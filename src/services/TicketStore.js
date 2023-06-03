import { create } from 'zustand';

const useTicketStore = create((set) => ({
  selectedCounts: {},
  setSelectedCounts: (counts) => set({ selectedCounts: counts }),
}));

export default useTicketStore;
