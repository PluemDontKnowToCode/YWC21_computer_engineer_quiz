type QuizFeedbackProps = {
  isVisible: boolean;
  isCorrect: boolean;
  explanation: string;
};

export default function QuizFeedback({ isVisible, isCorrect, explanation }: QuizFeedbackProps) {
  if (!isVisible) return null;

  return (
    <div className={`quiz-feedback${isCorrect ? " is-correct" : " is-incorrect"}`} role="status" aria-live="polite">
      <strong>{isCorrect ? "Correct!" : "Not quite."}</strong>
      <span>{explanation}</span>
    </div>
  );
}
