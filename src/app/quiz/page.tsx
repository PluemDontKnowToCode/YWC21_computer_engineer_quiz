import LessonLayout from "../components/layout/lesson-layout";
import QuizLesson from "./quiz-lesson";

export default function QuizPage() {
  return (
    <LessonLayout
      lesson="quiz"
      kicker="PRACTICE · QUIZ"
      intro="Practice recall and short calculations across cache policies, bit operations, and number conversion. After each answer, read the explanation; your correct-answer total is saved in this browser."
    >
      <QuizLesson />
    </LessonLayout>
  );
}
