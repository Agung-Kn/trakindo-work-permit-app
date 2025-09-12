export default function Textarea({
  label,
  id,
  name,
  prefix, // opsional
  suffix, // opsional
  placeholder,
  value,
  onChange,
  rows = 3,
  size = "md", // sm, md, lg
  className = "",
  error,
  helperText,
  required = false,
  disabled = false, // 👈 tambahan
}) {
  const sizeClasses = {
    sm: "py-1 text-sm",
    md: "py-1.5 text-base",
    lg: "py-2 text-lg",
  };

  const inputBorderClass = error
    ? "outline-red-500 focus-within:outline-red-500"
    : "outline-gray-300 focus-within:outline-indigo-600 dark:outline-gray-600 dark:focus-within:outline-indigo-400";

  return (
    <div className={`sm:col-span-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="mt-2">
        <div
          className={`flex rounded-md bg-white dark:bg-gray-800 pl-3 pr-3 outline-1 -outline-offset-1 
                      ${inputBorderClass} 
                      focus-within:outline-2 focus-within:-outline-offset-2 
                      disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {/* Prefix */}
          {prefix && (
            <div
              className={`shrink-0 text-gray-500 dark:text-gray-400 select-none pt-2 ${
                size === "lg"
                  ? "text-lg"
                  : size === "sm"
                  ? "text-sm"
                  : "text-base"
              }`}
            >
              {prefix}
            </div>
          )}

          {/* Textarea */}
          <textarea
            id={id}
            name={name || id}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`block min-w-0 grow bg-white dark:bg-gray-800 
                        px-1 placeholder:text-gray-400 dark:placeholder:text-gray-500 
                        focus:outline-none resize-none 
                        ${sizeClasses[size]}`}
          />

          {/* Suffix */}
          {suffix && (
            <div
              className={`shrink-0 text-gray-500 dark:text-gray-400 pt-2 ${
                size === "lg"
                  ? "text-lg"
                  : size === "sm"
                  ? "text-sm"
                  : "text-base"
              }`}
            >
              {suffix}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

        {/* Helper Text */}
        {!error && helperText && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}
