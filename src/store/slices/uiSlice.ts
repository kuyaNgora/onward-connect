import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  mobileMenuOpen: boolean
  loading: boolean
  toast: null | { message: string; type: 'success' | 'error' | 'info' }
}

const initialState: UIState = {
  mobileMenuOpen: false,
  loading: false,
  toast: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) => {
      state.toast = action.payload
    },
    hideToast: (state) => {
      state.toast = null
    },
  },
})

export const { toggleMobileMenu, setMobileMenuOpen, setLoading, showToast, hideToast } = uiSlice.actions
export default uiSlice.reducer
