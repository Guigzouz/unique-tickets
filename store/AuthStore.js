import { create } from 'zustand';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'


const useAuthStore = create((set) => ({
  user: null,

  checkAuthState: () => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        set({ user });
      } else {
        set({ user: null });
      }
    });
  },

  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      set({ user });
      return user;
    } catch (error) {
      console.log('Error: ', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await auth.signOut();
      set({ user: null });
    } catch (error) {
      console.log('Error: ', error);
      throw error;
    }
  },
}));

export default useAuthStore;
