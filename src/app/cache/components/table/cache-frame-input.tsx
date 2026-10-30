type CacheFrameInputProps = {
  answer: string;
  label: string;
  onAnswerChange: (value: string) => void;
};

export default function CacheFrameInput({ answer, label, onAnswerChange }: CacheFrameInputProps) {
  return (
    <input
      aria-label={label}
      className="frame-answer-input"
      value={answer}
      maxLength={2}
      onChange={(event) => onAnswerChange(event.target.value.toUpperCase())}
    />
  );
}
