import { type SessionData } from "./types";
import {
  AuthError,
  handleCookieError,
  areCookiesEnabled,
} from "./errorHandler";
import { validateSession, checkSessionSize } from "./sessionValidator";

/**
 * Helper function to detect the appropriate cookie domain
 * Uses 'localhost' for local development and '.onward.co.id' for production
 * @returns {string} The cookie domain to use
 */
export const getCookieDomain = (): string => {
  // Check if running in browser context
  if (typeof window === "undefined") {
    // Default to production in server-side rendering
    return ".onward.co.id";
  }

  // Check if hostname includes 'localhost' for development
  const isLocalhost = window.location.hostname.includes("localhost");
  return isLocalhost ? "localhost" : ".onward.co.id";
};

/**
 * Get the auth_session cookie value
 * @returns {SessionData | null} Parsed session data or null if not found
 */
export const getCookieSession = (): SessionData | null => {
  if (typeof document === "undefined") {
    return null;
  }

  // Check if cookies are enabled
  if (!areCookiesEnabled()) {
    throw handleCookieError(new Error("Cookies are disabled"));
  }

  // Split cookies and find auth_session
  const cookies = document.cookie.split(";");
  console.log('[Connect CookieUtils] All cookies:', document.cookie);
  const authCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("auth_session="),
  );

  if (!authCookie) {
    return null;
  }

  try {
    // Extract the value after 'auth_session='
    const value = authCookie.split("=")[1];
    const decoded = decodeURIComponent(value);
    const parsed = JSON.parse(decoded);
    return parsed;
  } catch (error) {
    console.error("Failed to parse auth_session cookie:", error);
    // Clear malformed cookie to prevent future errors
    clearSessionCookie();
    throw handleCookieError(error as Error);
  }
};

/**
 * Store session data in the auth_session cookie
 * @param {SessionData} sessionData - The session data to store
 */
export const setCookieSession = (sessionData: SessionData): void => {
  if (typeof document === "undefined") {
    console.warn("Cannot set cookies during server-side rendering");
    return;
  }

  // Check if cookies are enabled
  if (!areCookiesEnabled()) {
    throw handleCookieError(new Error("Cookies are disabled"));
  }

  // Validate session before storing
  const validation = validateSession(sessionData);
  if (!validation.isValid) {
    throw validation.error!;
  }

  // Check session size
  const sizeCheck = checkSessionSize(sessionData);
  if (!sizeCheck.isWithinLimit) {
    console.warn(`Session cookie size: ${sizeCheck.sizeKB}KB (close to limit)`);
  }

  const domain = getCookieDomain();
  const jsonStr = JSON.stringify(sessionData);
  const encoded = encodeURIComponent(jsonStr);

  try {
    // Set cookie with proper security attributes
    // For localhost, DON'T set domain attribute (allows cross-port sharing)
    // For production, set domain to .onward.co.id (allows cross-subdomain sharing)
    const domainAttr = domain === "localhost" ? "" : `domain=${domain};`;
    const secureAttr = domain === "localhost" ? "" : "Secure;";
    const cookieValue = `auth_session=${encoded}; ${domainAttr}path=/; max-age=86400; SameSite=Lax;${secureAttr}`;
    console.log('[Connect CookieUtils] Setting cookie:', {
      domain,
      domainAttr,
      cookieValue: cookieValue.substring(0, 200) + '...', // Truncate for logging
    });
    document.cookie = cookieValue;
    console.log('[Connect CookieUtils] Cookie set. Current cookies:', document.cookie.substring(0, 500) + '...');
  } catch (error) {
    throw handleCookieError(error as Error);
  }
};

/**
 * Clear the auth_session cookie
 */
export const clearSessionCookie = (): void => {
  if (typeof document === "undefined") {
    return;
  }

  const domain = getCookieDomain();
  // For localhost, DON'T set domain attribute (for consistency with setCookieSession)
  const domainAttr = domain === "localhost" ? "" : `domain=${domain};`;
  const secureAttr = domain === "localhost" ? "" : "Secure;";
  // Set cookie with expiry in the past to delete it
  document.cookie = `auth_session=; ${domainAttr}path=/; max-age=0; SameSite=Lax;${secureAttr}`;
};

/**
 * Restore session from cookie
 * @returns {SessionData | null} Parsed session data or null
 */
export const restoreSessionFromCookie = (): SessionData | null => {
  try {
    const sessionData = getCookieSession();

    if (!sessionData) {
      return null;
    }

    // Basic validation of required fields
    // With dual-token architecture, we need at least one token (user is optional, extracted from JWT)
    if (
      !sessionData.tms_token && !sessionData.wms_token
    ) {
      console.warn("Invalid session structure in cookie, clearing...");
      clearSessionCookie();
      return null;
    }

    // TODO: Add JWT validation here when available
    // For now, we assume the token is valid if it exists

    return sessionData;
  } catch (error) {
    console.error("Failed to restore session from cookie:", error);
    if (error instanceof AuthError) {
      throw error;
    }
    throw handleCookieError(error as Error);
  }
};
