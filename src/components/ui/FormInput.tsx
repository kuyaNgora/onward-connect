import { InputHTMLAttributes } from "react";

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
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-white border-2 rounded-xl px-5 py-3.5 text-surface-950 placeholder:text-surface-400 focus:outline-none focus:ring-4 transition-all font-medium ${
          hasError
            ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
            : "border-surface-200 focus:ring-primary-500/20 focus:border-primary-500"
        }`}
        {...rest}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {!error && helperText && <p className="text-xs text-surface-500 mt-1">{helperText}</p>}
    </div>
  );
}
