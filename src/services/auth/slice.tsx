import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../types";
import { setCookieSession, clearSessionCookie } from "./cookieUtils";
import { extractUserFromToken } from "./jwtUtils";

interface authState {
  authenticated: boolean;
  session: {
    user: User;
    tms_token?: string;
    wms_token?: string;
  } | null;
  selectedSystem: 'tms' | 'wms' | null;
}

const defineInitialState = (): authState => ({
  authenticated: false,
  session: null,
  selectedSystem: null,
});

export const authSlice = createSlice({
  name: "auth",
  initialState: defineInitialState(),
  reducers: {
    /**
     * Sign in with dual tokens (TMS + WMS)
     * Payload: { user, tms_token, wms_token }
     * NOTE: We only store tokens in cookie (not user) since user data is embedded in JWT
     * Target apps (TMS/WMS) will extract user from token themselves
     */
    signin: (state, action) => {
      const { user, tms_token, wms_token } = action.payload;

      // Decode JWT to get user data if not provided (e.g., returning from TMS/WMS)
      let decodedUser = user;
      if (!decodedUser && (tms_token || wms_token)) {
        decodedUser = extractUserFromToken(tms_token, wms_token);
      }

      state.session = {
        user: decodedUser,
        tms_token,
        wms_token,
      };
      state.authenticated = true;

      // Store tokens in cookie for SSO (user data is in JWT payload)
      if (typeof window !== 'undefined') {
        setCookieSession({
          tms_token,
          wms_token,
        });
      }
    },
    signout: (state) => {
      state.session = null;
      state.authenticated = false;
      state.selectedSystem = null;

      // Clear session cookie
      if (typeof window !== 'undefined') {
        clearSessionCookie();
      }
    },
    session: (state, action) => {
      state.session = action.payload;

      // Update cookie when session changes (only tokens, user is in JWT)
      if (action.payload && typeof window !== 'undefined') {
        setCookieSession({
          tms_token: action.payload.tms_token,
          wms_token: action.payload.wms_token,
        });
      }
    },
    /**
     * Set selected system (tms or wms)
     * This updates the selected_system in cookie for cross-domain SSO
     * NOTE: Only tokens are stored (user data is embedded in JWT)
     */
    setSelectedSystem: (state, action) => {
      state.selectedSystem = action.payload;

      // Update cookie with selected system (only tokens, user is in JWT)
      if (state.session && typeof window !== 'undefined') {
        setCookieSession({
          tms_token: state.session.tms_token,
          wms_token: state.session.wms_token,
          selected_system: action.payload,
        });
      }
    },
  },
});

// Selector to get active token based on selected system
export const selectActiveToken = (state: { auth: authState }) => {
  if (!state.auth.session) return null;
  if (state.auth.selectedSystem === 'tms') return state.auth.session.tms_token;
  if (state.auth.selectedSystem === 'wms') return state.auth.session.wms_token;
  return null;
};

export const { signin, signout, session, setSelectedSystem } = authSlice.actions;
export const authReducer = authSlice.reducer;
