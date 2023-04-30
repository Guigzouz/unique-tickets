import { create } from "zustand";

const connectionStore = create((set) => ({
    connected: false,
    setConnected: () => set(() => ({ connected: true })),
    setDisconnected: () => set(() => ({ connected: false })),
}));

export default connectionStore;