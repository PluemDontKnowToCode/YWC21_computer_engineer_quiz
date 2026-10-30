type BinaryDisplayProps = {
  value: string;
};

export default function BinaryDisplay({ value }: BinaryDisplayProps) {
  return (
    <div className="operand-binary">
      <span>BINARY</span>
      <code>{value}</code>
    </div>
  );
}
