import { TextareaHTMLAttributes } from "react";

interface FormTextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label?: string;
  error?: string;
  requiredMark?: boolean;
  rows?: number;
}

/**
 * Reusable form textarea component with integrated error handling
 *
 * Features:
 * - Automatic error styling (red border when error present)
 * - Error message display below field
 * - Optional label with required mark
 * - Consistent styling across forms
 */
export function FormTextArea({
  label,
  error,
  requiredMark = false,
  id,
  placeholder,
  value,
  onChange,
  name,
  rows = 2,
  ...rest
}: FormTextAreaProps) {
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
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full bg-white border-2 rounded-xl px-5 py-3.5 text-surface-950 placeholder:text-surface-400 focus:outline-none focus:ring-4 transition-all font-medium resize-none ${
          hasError
            ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
            : "border-surface-200 focus:ring-primary-500/20 focus:border-primary-500"
        }`}
        {...rest}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
