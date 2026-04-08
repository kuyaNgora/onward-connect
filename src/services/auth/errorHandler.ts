/**
 * Error handling utilities for authentication operations
 */

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export const AuthErrorCodes = {
  COOKIE_DISABLED: 'COOKIE_DISABLED',
  COOKIE_TOO_LARGE: 'COOKIE_TOO_LARGE',
  INVALID_SESSION: 'INVALID_SESSION',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  PARSE_ERROR: 'PARSE_ERROR',
} as const;

/**
 * Handle cookie-related errors with user-friendly messages
 */
export function handleCookieError(error: Error): AuthError {
  if (error.message.includes('Cookies are disabled')) {
    return new AuthError(
      'Cookies are disabled in your browser. Please enable cookies to use this application.',
      AuthErrorCodes.COOKIE_DISABLED,
      error
    );
  }

  if (error.message.includes('cookie size') || error.message.includes('413')) {
    return new AuthError(
      'Session data is too large. Please contact support.',
      AuthErrorCodes.COOKIE_TOO_LARGE,
      error
    );
  }

  if (error.message.includes('Failed to parse')) {
    return new AuthError(
      'Invalid session data. Please log in again.',
      AuthErrorCodes.PARSE_ERROR,
      error
    );
  }

  return new AuthError(
    'An authentication error occurred. Please try again.',
    'UNKNOWN_ERROR',
    error
  );
}

/**
 * Check if cookies are enabled in the browser
 */
export function areCookiesEnabled(): boolean {
  if (typeof document === 'undefined') return true;

  try {
    document.cookie = 'testcookie=1';
    const enabled = document.cookie.indexOf('testcookie=') !== -1;
    document.cookie = 'testcookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    return enabled;
  } catch (e) {
    return false;
  }
}

/**
 * Get user-friendly error message for display
 */
export function getErrorMessage(error: AuthError): string {
  switch (error.code) {
    case AuthErrorCodes.COOKIE_DISABLED:
      return 'Cookies are required for authentication. Please enable cookies in your browser settings.';

    case AuthErrorCodes.COOKIE_TOO_LARGE:
      return 'Your session contains too much data. Please log out and log in again.';

    case AuthErrorCodes.INVALID_SESSION:
      return 'Your session is invalid. Please log in again.';

    case AuthErrorCodes.SESSION_EXPIRED:
      return 'Your session has expired. Please log in again.';

    case AuthErrorCodes.NETWORK_ERROR:
      return 'Network error occurred. Please check your connection and try again.';

    case AuthErrorCodes.PARSE_ERROR:
      return 'Authentication data is corrupted. Please clear your browser cache and try again.';

    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
}