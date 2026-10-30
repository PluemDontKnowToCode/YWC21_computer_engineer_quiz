import CacheLesson from "./cache-lesson";
import LessonLayout from "../components/layout/lesson-layout";
import type { LessonTab } from "../components/navigation/lesson-types";
import type { Policy } from "../../service/cache/types";

const lessonTabByPolicy: Record<Policy, LessonTab> = {
  FIFO: "fifo",
  LRU: "lru",
  MIN: "min",
  LFU: "lfu",
};

const policyIntros: Record<Policy, string> = {
  FIFO: "First in, first out (FIFO) replaces the page that entered the cache earliest. A hit does not change its arrival order.",
  LRU: "Least recently used (LRU) replaces the page whose most recent access was longest ago. Every hit updates which page is newest.",
  MIN: "MIN replaces the page whose next reference is farthest away. It can look ahead, so it is an ideal benchmark rather than a policy a real cache can usually implement.",
  LFU: "Least frequently used (LFU) replaces the resident page with the fewest references. When counts tie, this lesson uses LRU as the tie-breaker.",
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
