import BitLesson from "./bit-lesson";
import LessonLayout from "../components/layout/lesson-layout";
import type { LessonTab } from "../components/navigation/lesson-types";
import type { BitOperation } from "../../service/bits/operations";
import { operationContent } from "./components/operation/operation-content";

const lessonTabByOperation: Record<BitOperation, LessonTab> = {
  sum: "sum",
  subtract: "subtract",
  shl: "shl",
  shr: "shr",
};

export default function BitOperationRoute({ operation }: { operation: BitOperation }) {
  return (
    <LessonLayout
      lesson={lessonTabByOperation[operation]}
      kicker={`${operation.toUpperCase()} · BIT OPERATION`}
      intro={operationContent[operation].intro}
    >
      <BitLesson operation={operation} />
    </LessonLayout>
  );
}
