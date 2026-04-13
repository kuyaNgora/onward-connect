import type { User } from "../types";

/**
 * Session data structure stored in the auth_session cookie
 * Only tokens are stored - user data is extracted from JWT by target apps
 */
export interface SessionData {
  /** User information (optional - targets extract from JWT) */
  user?: User;
  /** TMS specific JWT token */
  tms_token?: string;
  /** WMS specific JWT token */
  wms_token?: string;
  /** Selected system after login */
  selected_system?: "tms" | "wms" | null;
}

export interface SSOEnvironment {
  VITE_SSO_TARGET_URL_TMS: string;
  VITE_SSO_TARGET_URL_WMS: string;
  VITE_API_URL: string;
}
