/**
 * Session validation utilities
 */

import { SessionData } from "./types";
import { AuthError, AuthErrorCodes } from "./errorHandler";

/**
 * JWT payload interface
 */
interface JWTPayload {
  sub: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
  // Add other claims as needed
}

/**
 * Decode JWT without verification (for local validation)
 * Note: This does not verify the signature - always verify on the server
 */
export function decodeJWT(token: string): JWTPayload {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    throw new AuthError(
      'Invalid JWT token format',
      AuthErrorCodes.INVALID_SESSION,
      error as Error
    );
  }
}

/**
 * Check if JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const payload = decodeJWT(token);
    const currentTime = Math.floor(Date.now() / 1000);

    // Add 5 minute buffer to account for clock skew
    const isExpired = payload.exp < (currentTime - 300);

    return isExpired;
  } catch (error) {
    return true; // Treat decoding errors as expired
  }
}

/**
 * Validate session data structure for dual-token architecture
 */
export function validateSessionStructure(session: any): session is SessionData {
  if (!session || typeof session !== 'object') {
    return false;
  }

  // With dual-token architecture, check for at least one token
  if (!session.tms_token && !session.wms_token) {
    return false;
  }

  if (!session.user || typeof session.user !== 'object') {
    return false;
  }

  // Check required user fields
  const requiredUserFields = ['id', 'email'];
  for (const field of requiredUserFields) {
    if (!(field in session.user)) {
      return false;
    }
  }

  return true;
}

/**
 * Full session validation including JWT expiration
 * Validates both tokens if present, fails if both are expired
 */
export function validateSession(session: SessionData): {
  isValid: boolean;
  error?: AuthError;
} {
  // Validate structure
  if (!validateSessionStructure(session)) {
    return {
      isValid: false,
      error: new AuthError(
        'Invalid session structure',
        AuthErrorCodes.INVALID_SESSION
      ),
    };
  }

  // Check token expiration - at least one token must be valid
  const tmsExpired = session.tms_token ? isTokenExpired(session.tms_token) : true;
  const wmsExpired = session.wms_token ? isTokenExpired(session.wms_token) : true;

  // Both tokens expired = invalid session
  if (tmsExpired && wmsExpired) {
    return {
      isValid: false,
      error: new AuthError(
        'Session has expired',
        AuthErrorCodes.SESSION_EXPIRED
      ),
    };
  }

  return { isValid: true };
}

/**
 * Check session size before storing in cookie
 */
export function checkSessionSize(session: SessionData): {
  isWithinLimit: boolean;
  sizeKB: number;
} {
  const jsonStr = JSON.stringify(session);
  const encoded = encodeURIComponent(jsonStr);
  const sizeBytes = encoded.length;
  const sizeKB = sizeBytes / 1024;

  return {
    isWithinLimit: sizeBytes < 4096, // 4KB limit
    sizeKB: Math.round(sizeKB * 100) / 100,
  };
}