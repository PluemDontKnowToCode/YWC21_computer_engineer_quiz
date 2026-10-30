"use client";

import QuizProgressCard from "../components/quiz-progress-card";
import QuizQuestionCard from "../components/quiz-question-card";
import { quizQuestions } from "./questions";
import useQuizProgress from "./use-quiz-progress";

export default function QuizLesson() {
  const quizProgress = useQuizProgress(quizQuestions.length);
  const question = quizQuestions[quizProgress.questionIndex];
  const questionNumber = quizProgress.questionIndex + 1;

  return (
    <section className="lesson-section quiz-section" aria-label="Practice quiz">
      <div className="quiz-layout">
        <QuizQuestionCard
          question={question}
          questionNumber={questionNumber}
          isLastQuestion={questionNumber === quizQuestions.length}
          selectedAnswerIndex={quizProgress.selectedAnswerIndex}
          isProgressReady={quizProgress.hasLoadedProgress}
          onAnswerSelect={quizProgress.handleAnswerSelect}
          onNextQuestion={quizProgress.handleNextQuestion}
        />
        <QuizProgressCard
          questionNumber={questionNumber}
          questionCount={quizQuestions.length}
          sessionCorrectCount={quizProgress.sessionCorrectCount}
          totalCorrectCount={quizProgress.totalCorrectCount}
          isProgressReady={quizProgress.hasLoadedProgress}
        />
      </div>
    </section>
  );
}
