import LessonLayout from "../components/lesson-layout";
import QuizLesson from "./quiz-lesson";

export default function QuizPage() {
  return (
    <LessonLayout
      lesson="quiz"
      kicker="PRACTICE · QUIZ"
      intro="Practice cache policies, bit operations, and number conversion. Your correct-answer total is saved in this browser."
    >
      <QuizLesson />
    </LessonLayout>
  );
}
