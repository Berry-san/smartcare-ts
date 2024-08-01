import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
}

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

export const { setUserData, clearUserData } = authSlice.actions

export const selectUser = (state: { auth: AuthState }) => state.auth

export default authSlice.reducer
