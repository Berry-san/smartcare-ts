import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'

// Define the type for the auth state
interface AuthState {
  isAuthenticated: boolean
}

// Define a type for the persisted state
interface PersistedState {
  auth: AuthState
}

// Default state for auth
const defaultAuthState: AuthState = { isAuthenticated: false }

// Load state from sessionStorage if available
const persistedState: Partial<PersistedState> = sessionStorage.getItem(
  'reduxState'
)
  ? JSON.parse(sessionStorage.getItem('reduxState') as string)
  : { auth: defaultAuthState }

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: persistedState, // Load initial state from sessionStorage
})

// Define the RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>

// Subscribe to Redux store changes
store.subscribe(() => {
  sessionStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export type AppDispatch = typeof store.dispatch
export default store
