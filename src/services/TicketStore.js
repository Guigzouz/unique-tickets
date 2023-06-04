import { create } from 'zustand';

const useTicketStore = create((set) => ({
  selectedCounts: {},
  setSelectedCounts: (counts) => set({ selectedCounts: counts }),
  eventId: null,
  setEventId: (eventId) => set({ eventId }),

}));

export default useTicketStore;
