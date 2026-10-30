import CacheLesson from "./cache-lesson";
import LessonLayout from "../components/lesson-layout";
import type { LessonTab } from "../components/lesson-types";
import type { Policy } from "../../service/cache/types";

const lessonTabByPolicy: Record<Policy, LessonTab> = {
  FIFO: "fifo",
  LRU: "lru",
  MIN: "min",
  LFU: "lfu",
};

const policyIntros: Record<Policy, string> = {
  FIFO: "FIFO removes the page that has been in cache the longest.",
  LRU: "LRU removes the page that has gone unused for the longest time.",
  MIN: "MIN removes the page whose next use is farthest in the future.",
  LFU: "LFU removes the least frequently used page, breaking ties with least recent use.",
};

export default function CachePolicyRoute({ policy }: { policy: Policy }) {
  return (
    <LessonLayout
      lesson={lessonTabByPolicy[policy]}
      kicker={`${policy} · CACHE POLICY`}
      intro={policyIntros[policy]}
    >
      <CacheLesson policy={policy} />
    </LessonLayout>
  );
}
