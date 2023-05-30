import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      checkAuthState: () => {
        return onAuthStateChanged(auth, (user) => {
          if (user) {
            set({ user });
            console.log("CheckAuth user:", user.email);
          } else {
            set({ user: null });
            console.log("CheckAuth user: null");
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
    }),
    {
      name: "user-state",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
