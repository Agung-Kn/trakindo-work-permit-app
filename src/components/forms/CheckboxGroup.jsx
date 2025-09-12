export default function CheckboxGroup({
  label,
  options = [],
  value = [],
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  className = "",
}) {
  const handleToggle = (val) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className={`sm:col-span-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="mt-2 space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-2 cursor-pointer 
                        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input
              type="checkbox"
              value={opt.value}
              checked={value.includes(opt.value)}
              onChange={() => handleToggle(opt.value)}
              disabled={disabled}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {opt.label}
            </span>
          </label>
        ))}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {!error && helperText && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
}
