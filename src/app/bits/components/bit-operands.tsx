import BinaryDisplay from "./binary-display";
import BitOperandInput from "./bit-operand-input";

type BitOperandsProps = {
  left: number;
  right: number;
  leftBinary: string;
  rightBinary: string;
  operator: string;
  onLeftChange: (value: string) => void;
  onRightChange: (value: string) => void;
};

export default function BitOperands({
  left,
  right,
  leftBinary,
  rightBinary,
  operator,
  onLeftChange,
  onRightChange,
}: BitOperandsProps) {
  return (
    <div className="operand-row">
      <BitOperandInput label="First number" value={left} onChange={onLeftChange} />
      <BinaryDisplay value={leftBinary} />
      <div className="operand-operator">{operator}</div>
      <BitOperandInput label="Second number" value={right} onChange={onRightChange} />
      <BinaryDisplay value={rightBinary} />
    </div>
  );
}
