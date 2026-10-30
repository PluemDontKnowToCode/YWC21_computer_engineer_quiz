import CacheAnswerCell from "./cache-answer-cell";
import CacheFrameInput from "./cache-frame-input";

type CacheFrameCellProps = {
  isAnswerVisible: boolean;
  expectedValue: string | undefined;
  answer: string;
  label: string;
  onAnswerChange: (value: string) => void;
};

export default function CacheFrameCell({
  isAnswerVisible,
  expectedValue,
  answer,
  label,
  onAnswerChange,
}: CacheFrameCellProps) {
  if (isAnswerVisible) {
    return <CacheAnswerCell value={expectedValue} />;
  }

  return <CacheFrameInput answer={answer} label={label} onAnswerChange={onAnswerChange} />;
}
