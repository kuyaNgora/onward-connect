/**
 * Environment Configuration for SSO
 * Provides centralized access to environment variables with type safety
 */

/**
 * SSO target URLs for redirect after authentication
 */
export const SSO_TARGETS = {
  TMS: import.meta.env.VITE_SSO_TARGET_URL_TMS || 'https://tms.onward.co.id',
  WMS: import.meta.env.VITE_SSO_TARGET_URL_WMS || 'https://wms.onward.co.id',
} as const;

/**
 * API configuration
 */
export const API_CONFIG = {
  URL: import.meta.env.VITE_API_URL || 'https://api.connect.onward.id',
} as const;

/**
 * Environment detection
 */
export const isProduction = import.meta.env.PROD;

/**
 * Cookie domain for current environment
 * For production: .onward.co.id
 * For development/localhost: localhost
 */
export const COOKIE_DOMAIN = isProduction ? '.onward.co.id' : 'localhost';

/**
 * Required environment variables validation
 */
export const validateEnvironmentVariables = (): void => {
  const requiredVars = [
    'VITE_API_URL',
    'VITE_SSO_TARGET_URL_TMS',
    'VITE_SSO_TARGET_URL_WMS',
  ];

  const missing = requiredVars.filter((v) => !import.meta.env[v]);

  if (missing.length > 0) {
    console.error(`Missing required environment variables:`, missing);
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
};

/**
 * Initialize environment and validate variables
 */
export const initEnvironment = (): void => {
  // Validate required environment variables
  validateEnvironmentVariables();

  // Log current configuration in development
  if (!isProduction) {
    console.log('Environment Configuration:', {
      ENVIRONMENT: import.meta.env.VITE_ENV,
      API_URL: API_CONFIG.URL,
      TMS_URL: SSO_TARGETS.TMS,
      WMS_URL: SSO_TARGETS.WMS,
      COOKIE_DOMAIN,
    });
  }
};