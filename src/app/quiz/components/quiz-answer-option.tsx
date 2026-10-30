type QuizAnswerOptionProps = {
  answer: string;
  index: number;
  isDisabled: boolean;
  isAnswered: boolean;
  isSelected: boolean;
  isCorrect: boolean;
  onSelect: () => void;
};

export default function QuizAnswerOption({
  answer,
  index,
  isDisabled,
  isAnswered,
  isSelected,
  isCorrect,
  onSelect,
}: QuizAnswerOptionProps) {
  const stateClass = !isAnswered ? "" : isCorrect ? " is-correct" : isSelected ? " is-incorrect" : "";

  return (
    <button
      className={`quiz-answer-option${stateClass}`}
      type="button"
      disabled={isDisabled}
      aria-pressed={isSelected}
      onClick={onSelect}
    >
      <span className="quiz-answer-letter">{String.fromCharCode(65 + index)}</span>
      <span>{answer}</span>
    </button>
  );
}
