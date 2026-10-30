type BitOperandInputProps = {
  label: string;
  value: number;
  onChange: (value: string) => void;
};

export default function BitOperandInput({ label, value, onChange }: BitOperandInputProps) {
  return (
    <label>
      {label}
      <input
        type="number"
        min="0"
        max="255"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
