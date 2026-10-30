import BinaryDisplay from "./binary-display";
import BitOperandInput from "./bit-operand-input";

type BitOperandsProps = {
  left: number;
  right: number;
  leftBinary: string;
  rightBinary: string;
  operator: string;
  isShiftOperation: boolean;
  onLeftChange: (value: string) => void;
  onRightChange: (value: string) => void;
};

export default function BitOperands({
  left,
  right,
  leftBinary,
  rightBinary,
  operator,
  isShiftOperation,
  onLeftChange,
  onRightChange,
}: BitOperandsProps) {
  return (
    <div className={isShiftOperation ? "operand-row operand-row--shift" : "operand-row"}>
      <div className="operand-group">
        <BitOperandInput
          label={isShiftOperation ? "Number to shift" : "First number"}
          value={left}
          onChange={onLeftChange}
        />
        <BinaryDisplay value={leftBinary} />
      </div>
      <div className="operand-operator">{operator}</div>
      {!isShiftOperation && (
        <div className="operand-group">
          <BitOperandInput label="Second number" value={right} onChange={onRightChange} />
          <BinaryDisplay value={rightBinary} />
        </div>
      )}
    </div>
  );
}
