import type { QuizQuestion } from "../questions";
import QuizAnswerOption from "./quiz-answer-option";
import QuizFeedback from "./quiz-feedback";

type QuizQuestionCardProps = {
  question: QuizQuestion;
  questionNumber: number;
  isLastQuestion: boolean;
  selectedAnswerIndex: number | null;
  isProgressReady: boolean;
  onAnswerSelect: (selectedIndex: number, correctIndex: number) => void;
  onNextQuestion: () => void;
};

export default function QuizQuestionCard({
  question,
  questionNumber,
  isLastQuestion,
  selectedAnswerIndex,
  isProgressReady,
  onAnswerSelect,
  onNextQuestion,
}: QuizQuestionCardProps) {
  const isAnswered = selectedAnswerIndex !== null;
  const isAnswerDisabled = isAnswered || !isProgressReady;
  const isAnswerCorrect = selectedAnswerIndex === question.answerIndex;

  return (
    <section className="quiz-question-card" aria-labelledby="quiz-question-title">
      <p className="quiz-topic">{question.topic}</p>
      <p className="quiz-question-number">QUESTION {questionNumber}</p>
      <h2 id="quiz-question-title">{question.prompt}</h2>

      <div className="quiz-answer-list">
        {question.choices.map((answer, index) => (
          <QuizAnswerOption
            key={answer}
            answer={answer}
            index={index}
            isDisabled={isAnswerDisabled}
            isAnswered={isAnswered}
            isSelected={selectedAnswerIndex === index}
            isCorrect={index === question.answerIndex}
            onSelect={() => onAnswerSelect(index, question.answerIndex)}
          />
        ))}
      </div>

      <QuizFeedback
        isVisible={isAnswered}
        isCorrect={isAnswerCorrect}
        explanation={question.explanation}
      />

      <button
        className="quiz-next-button"
        type="button"
        disabled={!isAnswered || !isProgressReady}
        onClick={onNextQuestion}
      >
        {isLastQuestion ? "Start another round" : "Next question"}
        <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}
