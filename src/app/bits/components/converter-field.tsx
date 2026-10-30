type ConverterFieldProps = {
  label: string;
  ariaLabel: string;
  value: string;
  inputMode?: "numeric";
  autoCapitalize?: "characters";
  onChange: (value: string) => void;
};

export default function ConverterField({
  label,
  ariaLabel,
  value,
  inputMode,
  autoCapitalize,
  onChange,
}: ConverterFieldProps) {
  return (
    <label className="converter-field">
      <span>{label}</span>
      <input
        aria-label={ariaLabel}
        inputMode={inputMode}
        autoCapitalize={autoCapitalize}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
