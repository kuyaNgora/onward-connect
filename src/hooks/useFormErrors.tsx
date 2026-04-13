import { useAppSelector } from "@/hooks/useAppSelector";
import { useFormActions } from "@/services/form/hooks";

/**
 * Custom hook for handling form field errors from Redux form state
 * Provides utilities to get and clear field-specific errors
 */
export function useFormErrors() {
  const { errors: formErrors } = useAppSelector((state) => state.form);
  const { reset: resetForm } = useFormActions();

  /**
   * Get error message for a specific field
   * Handles both string and string[] error formats from API
   */
  const getFieldError = (fieldName: string): string | undefined => {
    const err = formErrors?.[fieldName];
    if (typeof err === "string") return err;
    if (Array.isArray(err)) return err[0];
    return undefined;
  };

  /**
   * Get general error message (not field-specific)
   * Returns message from errors object or fallback to string format
   */
  const getGeneralError = (): string | undefined => {
    if (formErrors?.message) return String(formErrors.message);
    if (typeof formErrors === "string") return formErrors;
    return undefined;
  };

  /**
   * Check if a specific field has an error
   */
  const hasFieldError = (fieldName: string): boolean => {
    return getFieldError(fieldName) !== undefined;
  };

  /**
   * Clear all form errors
   */
  const clearErrors = () => {
    resetForm();
  };

  /**
   * Clear errors when user types in a field
   * Call this in input onChange handlers
   */
  const clearErrorOnInput = (fieldName: string) => {
    if (hasFieldError(fieldName)) {
      clearErrors();
    }
  };

  return {
    formErrors,
    getFieldError,
    getGeneralError,
    hasFieldError,
    clearErrors,
    clearErrorOnInput,
  };
}
