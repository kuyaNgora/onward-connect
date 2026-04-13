import { useDispatch } from "react-redux";
import { useFormActions } from "../form/hooks";
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from "./api";
import { signin, signout } from "./slice";
import { extractUserFromToken } from "./jwtUtils";

/**
 * TMS Onward - Authentication Hooks
 */

export const useAuth = () => {
  const dispatch = useDispatch();
  const { failureWithTimeout } = useFormActions();

  const [loginMutation, loginResult] = useLoginMutation();
  const [registerMutation, registerResult] = useRegisterMutation();
  const [logoutMutation, logoutResult] = useLogoutMutation();

  /**
   * Login with identifier (email/username) and password
   * Backend returns dual tokens: tms_token and wms_token
   * User info is embedded inside the JWT tokens (decoded client-side)
   */
  const login = async (identifier: string, password: string) => {
    try {
      const res = await loginMutation({ identifier, password }).unwrap();
      console.log('[Connect Auth] Login response:', res);
      // Response format: { tms_token, wms_token } (may be wrapped in data property)
      // Normalize response structure - handle both { data: {...} } and direct { ... }
      const tokens = res?.data || res;
      console.log('[Connect Auth] Normalized tokens:', tokens);
      if (tokens?.tms_token && tokens?.wms_token) {
        // Extract user info from JWT token (prefer TMS token as it has more fields)
        const user = extractUserFromToken(tokens.tms_token, tokens.wms_token);
        if (!user) {
          throw new Error("Failed to extract user information from tokens");
        }

        // Dispatch signin action with dual tokens and extracted user
        dispatch(signin({
          user,
          tms_token: tokens.tms_token,
          wms_token: tokens.wms_token,
        }));
      }
    } catch (err) {
      failureWithTimeout(err);
    }
  };

  /**
   * Register new company & admin user
   * Backend expects:
   * { company_name, address, name, email, username, password, confirm_password, phone }
   * After successful registration, user should login manually.
   */
  const register = async (data: {
    company_name: string;
    address: string;
    name: string;
    email: string;
    username: string;
    password: string;
    confirm_password: string;
    phone?: string;
  }) => {
    try {
      await registerMutation({
        company_name: data.company_name,
        address: data.address,
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
        confirm_password: data.confirm_password,
        phone: data.phone || "",
      }).unwrap();
      // Registration successful - no auto-login, user navigates manually
    } catch (err) {
      failureWithTimeout(err);
    }
  };

  /**
   * Logout current user
   */
  const logout = async () => {
    try {
      await logoutMutation(undefined).unwrap();
      dispatch(signout());
    } catch (err) {
      // Even if API call fails, clear local auth state
      dispatch(signout());
    }
  };

  return {
    login,
    register,
    logout,
    loginResult,
    registerResult,
    logoutResult,
  };
};
