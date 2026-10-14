export const labelClassName = "block text-sm font-medium text-gray-700";

export default function AuthField({
  autoComplete,
  id,
  label,
  name,
  onChange,
  placeholder,
  required = true,
  type = "text",
  value,
  inputMode,
  maxLength,
  register = false,
}) {
  const height = register ? "h-[38px]" : "h-10";

  return (
    <div>
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <input
        className={`mt-2 ${height} w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
        autoComplete={autoComplete}
        id={id}
        inputMode={inputMode}
        maxLength={maxLength}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </div>
  );
}
