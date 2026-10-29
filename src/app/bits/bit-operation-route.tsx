import BitLesson from "./bit-lesson";
import LessonLayout from "../components/lesson-layout";
import type { LessonTab } from "../lesson-types";

type BitOperation = "sum" | "subtract" | "shl" | "shr";

const lessonTabByOperation: Record<BitOperation, LessonTab> = {
  sum: "sum",
  subtract: "subtract",
  shl: "shl",
  shr: "shr",
};

const operationIntros: Record<BitOperation, string> = {
  sum: "Add two values and view the result in decimal and binary.",
  subtract: "Subtract one value from another and inspect the result in binary.",
  shl: "Shift every bit one place left, multiplying the value by two.",
  shr: "Shift every bit one place right, dividing the value by two.",
};

export default function BitOperationRoute({ operation }: { operation: BitOperation }) {
  return (
    <LessonLayout
      lesson={lessonTabByOperation[operation]}
      kicker={`${operation.toUpperCase()} · BIT OPERATION`}
      intro={operationIntros[operation]}
    >
      <BitLesson operation={operation} />
    </LessonLayout>
  );
}
