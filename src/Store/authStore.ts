// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// interface AuthState {
//   user: Record<string, any> | null
//   login: (userData: Record<string, any>) => void
//   logout: () => void
// }

// const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       login: (userData) => set({ user: userData }),
//       logout: () => set({ user: null }),
//     }),
//     {
//       name: 'auth-storage', // name of the storage item
//       getStorage: () => sessionStorage, // specify sessionStorage or localStorage
//     }
//   )
// )

// export default useAuthStore

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Define the types for the store's state and actions
interface AuthState {
  user: Record<string, any> | null
  login: (userData: Record<string, any>) => void
  logout: () => void
}

// Create the store with persistence using the `storage` option
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // Name of the storage (localStorage key)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useAuthStore
