import { useDispatch } from "react-redux";
import { useFormActions } from "../form/hooks";
import { useLoginMutation, useRegisterMutation, useLogoutMutation, useChangePasswordMutation } from "./api";
import { signin, signout } from "./slice";
import { useProfile } from "../profile";

/**
 * TMS Onward - Authentication Hooks
 */

export const useAuth = () => {
  const dispatch = useDispatch();
  const { getMe } = useProfile();
  const { failureWithTimeout } = useFormActions();

  const [loginMutation, loginResult] = useLoginMutation();
  const [registerMutation, registerResult] = useRegisterMutation();
  const [logoutMutation, logoutResult] = useLogoutMutation();
  const [changePasswordMutation, changePasswordResult] = useChangePasswordMutation();

  /**
   * Login with email and password
   * Backend returns dual tokens: tms_token and wms_token
   */
  const login = async (email: string, password: string) => {
    try {
      const res = await loginMutation({ email, password }).unwrap();
      // Response format: { user, tms_token, wms_token }
      if (res?.data?.tms_token && res?.data?.wms_token) {
        // Dispatch signin action with dual tokens
        dispatch(signin({
          user: res.data.user,
          tms_token: res.data.tms_token,
          wms_token: res.data.wms_token,
        }));
        // Fetch full user profile
        getMe();
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
      // No auto-login - user will be redirected to login page by RegisterPage
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

  /**
   * Change password for current user
   */
  const changePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => {
    try {
      await changePasswordMutation({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
      }).unwrap();
    } catch (err) {
      failureWithTimeout(err);
      throw err; // Re-throw to allow caller to handle
    }
  };

  return {
    login,
    register,
    logout,
    changePassword,
    loginResult,
    registerResult,
    logoutResult,
    changePasswordResult,
  };
};
