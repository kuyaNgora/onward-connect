import type { Company, User, UserGroup } from '../types';

/**
 * Session data structure that matches Redux auth state
 * This is stored in the auth_session cookie
 * With dual-token architecture for TMS and WMS
 */
export interface SessionData {
  /** User information */
  user: User;
  /** TMS specific JWT token */
  tms_token?: string;
  /** WMS specific JWT token */
  wms_token?: string;
  /** Selected system after login */
  selected_system?: 'tms' | 'wms' | null;
}

export interface SSOEnvironment {
  VITE_SSO_TARGET_URL_TMS: string;
  VITE_SSO_TARGET_URL_WMS: string;
  VITE_API_URL: string;
}
