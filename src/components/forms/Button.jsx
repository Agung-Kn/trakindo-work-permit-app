export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  disabled = false,
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-indigo-300",
    secondary:
      "border border-indigo-600 text-indigo-600 bg-white hover:bg-indigo-50 focus:ring-indigo-500 dark:bg-transparent dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-500 dark:hover:text-white",
    success:
      "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-400 dark:focus:ring-green-300",
    danger:
      "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-400 dark:focus:ring-red-300",
    warning:
      "text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400 dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:focus:ring-yellow-300",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {Icon && iconPosition === "left" && <Icon className="mr-2 h-5 w-5" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="ml-2 h-5 w-5" />}
    </button>
  );
}
