import { InputHTMLAttributes, useState } from "react";

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: string;
  requiredMark?: boolean;
  helperText?: string;
}

/**
 * Reusable form input component with integrated error handling
 *
 * Features:
 * - Automatic error styling (red border when error present)
 * - Error message display below field
 * - Optional label with required mark
 * - Optional helper text
 * - Consistent styling across forms
 */
export function FormInput({
  label,
  error,
  requiredMark = false,
  helperText,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  ...rest
}: FormInputProps) {
  const hasError = error !== undefined;
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-surface-700 mb-2"
        >
          {label} {requiredMark && <span className="text-accent-600">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white border-2 rounded-xl px-5 py-3.5 ${isPasswordField ? "pr-12" : ""} text-surface-950 placeholder:text-surface-400 focus:outline-none focus:ring-4 transition-all font-medium ${
            hasError
              ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
              : "border-surface-200 focus:ring-primary-500/20 focus:border-primary-500"
          }`}
          {...rest}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-surface-400 hover:text-surface-600 focus:outline-none transition-colors"
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {!error && helperText && <p className="text-xs text-surface-500 mt-1">{helperText}</p>}
    </div>
  );
}
