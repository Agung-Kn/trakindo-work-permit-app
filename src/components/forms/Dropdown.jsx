import { Fragment, useMemo } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from "@heroicons/react/20/solid";

export default function Dropdown({
  label,
  id,
  options = [],
  multiple = false,
  value,
  onChange,
  placeholder = "Select option...",
  error,
  helperText,
  required = false,
  disabled = false,
}) {
  // Map options agar konsisten
  const mappedOptions = useMemo(
    () => options.map((opt) => ({ id: opt.id, name: opt.name })),
    [options]
  );

  // Safe value untuk UI
  const safeValue = useMemo(() => {
    if (multiple) {
      if (!Array.isArray(value)) return [];
      return mappedOptions.filter((o) => value.includes(o.id));
    } else {
      if (!value) return null;
      return mappedOptions.find((o) => o.id === value) || null;
    }
  }, [value, multiple, mappedOptions]);

  const handleChange = (next) => {
    if (multiple) {
      onChange(next.map((n) => n.id));
    } else {
      onChange(next ? next.id : null);
    }
  };

  return (
    <div className="sm:col-span-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Listbox value={safeValue} onChange={handleChange} multiple={multiple} by="id" disabled={disabled}>
        {({ open }) => (
          <div className="relative mt-2">
            <ListboxButton
              className={`relative w-full cursor-default rounded-md border 
                ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"} 
                bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left 
                focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 
                sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="flex flex-wrap gap-1">
                {multiple ? (
                  safeValue.length > 0 ? (
                    safeValue.map((s) => (
                      <span
                        key={s.id}
                        className="flex items-center gap-1 rounded bg-indigo-100 dark:bg-indigo-900 px-2 py-0.5 text-sm text-indigo-700 dark:text-indigo-300"
                      >
                        {s.name}
                        <span
                          role="button"
                          tabIndex={0}
                          className="cursor-pointer rounded p-0.5 hover:bg-indigo-200 dark:hover:bg-indigo-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChange(safeValue.filter((item) => item.id !== s.id));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleChange(safeValue.filter((item) => item.id !== s.id));
                            }
                          }}
                          aria-label={`Remove ${s.name}`}
                        >
                          <XMarkIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                        </span>
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">{placeholder}</span>
                  )
                ) : safeValue ? (
                  <span>{safeValue.name}</span>
                ) : (
                  <span className="text-gray-400">{placeholder}</span>
                )}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
              </span>
            </ListboxButton>

            <Transition as={Fragment} show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ListboxOptions className="absolute mt-1 w-full max-h-60 overflow-auto rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg z-50 py-1 text-sm">
                {mappedOptions.map((opt) => (
                  <ListboxOption
                    key={opt.id}
                    value={opt}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-200"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {opt.name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-300">
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        )}
      </Listbox>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {!error && helperText && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
    </div>
  );
}
