/**
 * JWT Utilities for Connect
 * Decode JWT to extract user information
 */

/**
 * Decode JWT payload without verification (for client-side use)
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
export const decodeJWT = (token: string): any | null => {
  try {
    // JWT format: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode base64url payload
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonStr = atob(base64);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

/**
 * Extract user info from TMS or WMS token
 * Both tokens contain similar user fields: username, display_name, email
 * @param tms_token - TMS JWT token
 * @param wms_token - WMS JWT token
 * @returns User object or null
 */
export const extractUserFromToken = (tms_token?: string, wms_token?: string): any | null => {
  // Prefer TMS token for user info (has more fields like role, company_id)
  if (tms_token) {
    const decoded = decodeJWT(tms_token);
    console.log('[JWT Utils] TMS Token decoded:', decoded);
    if (decoded) {
      const user = {
        id: decoded.user_id,
        username: decoded.username,
        name: decoded.display_name,
        email: decoded.email,
        permission: decoded.permission,
        type: decoded.type,
        role: decoded.role,
        company_id: decoded.company_id,
        company: decoded.company_id ? {
          id: decoded.company_id,
          name: decoded.company_name || 'Unknown Company',
        } : undefined,
      };
      console.log('[JWT Utils] Extracted user:', user);
      return user;
    }
  }

  // Fallback to WMS token
  if (wms_token) {
    const decoded = decodeJWT(wms_token);
    console.log('[JWT Utils] WMS Token decoded:', decoded);
    if (decoded) {
      const user = {
        id: decoded.user_id,
        username: decoded.username,
        name: decoded.display_name,
        email: decoded.email,
        permission: decoded.permission,
        type: decoded.type,
        tenant_id: decoded.tenant_id,
        company: decoded.tenant_id ? {
          id: decoded.tenant_id,
          name: decoded.tenant_name || 'Unknown Company',
        } : undefined,
      };
      console.log('[JWT Utils] Extracted user:', user);
      return user;
    }
  }

  console.log('[JWT Utils] No valid token found');
  return null;
};

/**
 * Check if JWT token is expired
 * @param token - JWT token string
 * @returns true if expired or invalid
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
};
