import { useEffect, useState } from "react";

export default function Input({
  label,
  id,
  name,
  type = "text",
  prefix,
  suffix,
  placeholder,
  value,
  onChange,
  size = "md",
  className = "",
  error,
  helperText,
  defaultImage,
  required = false,
  disabled = false,
  register,
}) {
  const [preview, setPreview] = useState(defaultImage || null);

  const sizeClasses = {
    sm: "py-1 text-sm",
    md: "py-1.5 text-base",
    lg: "py-2 text-lg",
  };

  const inputBorderClass = error
    ? "outline-red-500 focus-within:outline-red-500"
    : "outline-gray-300 focus-within:outline-indigo-600 dark:outline-gray-600";

  useEffect(() => {
    if (type === "file" && value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (!value) {
      setPreview(defaultImage || null);
    }
  }, [value, type, defaultImage]);

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {type === "file" && preview && (
        <div className="mt-2 mb-3">
          <img
            src={preview}
            alt="preview"
            className="h-40 w-full max-w-md rounded-md object-cover border border-gray-300"
          />
        </div>
      )}

      <div className="mt-2">
        {type === "file" ? (
          <input
            id={id}
            name={name || id}
            type="file"
            required={required}
            disabled={disabled}
            {...(register ? register(name || id) : {})}
            className="block w-full text-sm text-gray-900 
                       file:mr-4 file:rounded-md file:border-0 
                       file:bg-indigo-600 file:px-4 file:py-2 
                       file:text-sm file:font-semibold file:text-white 
                       hover:file:bg-indigo-700 
                       focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
        ) : (
          <div
            className={`flex items-center rounded-md bg-white pl-3 pr-3 outline-1 -outline-offset-1 
                        ${inputBorderClass} 
                        focus-within:outline-2 focus-within:-outline-offset-2 
                        disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {prefix && (
              <div className={`shrink-0 text-gray-500 select-none ${sizeClasses[size]}`}>
                {prefix}
              </div>
            )}

            <input
              id={id}
              name={name || id}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required={required}
              disabled={disabled}
              {...(register ? register(name || id) : {})}
              className={`block min-w-0 grow bg-white 
                          px-1 placeholder:text-gray-400 
                          focus:outline-none ${sizeClasses[size]}`}
            />

            {suffix && (
              <div className={`shrink-0 text-gray-500 ${sizeClasses[size]}`}>
                {suffix}
              </div>
            )}
          </div>
        )}

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {!error && helperText && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    </div>
  );
}
