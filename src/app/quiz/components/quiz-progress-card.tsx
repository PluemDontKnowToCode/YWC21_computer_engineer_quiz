type QuizProgressCardProps = {
  questionNumber: number;
  questionCount: number;
  sessionCorrectCount: number;
  totalCorrectCount: number;
  isProgressReady: boolean;
};

export default function QuizProgressCard({
  questionNumber,
  questionCount,
  sessionCorrectCount,
  totalCorrectCount,
  isProgressReady,
}: QuizProgressCardProps) {
  const progress = (questionNumber / questionCount) * 100;

  return (
    <aside className="quiz-progress-card" aria-label="Quiz progress">
      <div className="quiz-progress-heading">
        <span>QUESTION</span>
        <strong>{questionNumber} / {questionCount}</strong>
      </div>
      <progress value={questionNumber} max={questionCount} aria-label={`${Math.round(progress)}% complete`} />
      <dl>
        <div><dt>Correct this round</dt><dd>{sessionCorrectCount}</dd></div>
        <div><dt>Correct answers saved</dt><dd>{isProgressReady ? totalCorrectCount : "…"}</dd></div>
      </dl>
    </aside>
  );
}
