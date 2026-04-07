import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  user: null | { email: string; name: string }
  token: string | null
  selectedSystem: 'tms' | 'wms' | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  selectedSystem: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserLogged: (state, action: PayloadAction<{ user: { email: string; name: string }; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true

      // Automatically store the JWT as a cross-subdomain cookie so TMS/WMS can natively pick it up
      const isLocalhost = window.location.hostname.includes('localhost')
      const domainField = isLocalhost ? 'localhost' : '.onwardconnect.id'
      document.cookie = `jwt_token=${action.payload.token}; domain=${domainField}; path=/; max-age=86400; Secure; SameSite=Lax`
    },
    setSelectedSystem: (state, action: PayloadAction<'tms' | 'wms'>) => {
      state.selectedSystem = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.selectedSystem = null

      // Clear the cross-domain cookie on logout
      const isLocalhost = window.location.hostname.includes('localhost')
      const domainField = isLocalhost ? 'localhost' : '.onwardconnect.id'
      document.cookie = `jwt_token=; domain=${domainField}; path=/; max-age=0; Secure; SameSite=Lax`
    },
  },
})

export const { setUserLogged, setSelectedSystem, logout } = authSlice.actions
export default authSlice.reducer
