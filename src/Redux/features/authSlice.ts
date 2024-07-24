import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the user state
interface AuthState {
  isAuthenticated: boolean
}

// Define the initial state using the defined type
const initialState: AuthState = {
  isAuthenticated: false,
}

// Create a slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated
    },
    clearUserData: (state) => {
      state.isAuthenticated = false
    },
  },
})

// Export the action creators and reducer
export const { setUserData, clearUserData } = authSlice.actions

// Define a selector function
export const selectUser = (state: { auth: AuthState }) => state.auth

// Export the reducer as default
export default authSlice.reducer
