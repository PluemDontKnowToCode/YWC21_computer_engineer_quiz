import type { CacheStep, Policy } from "../../../service/cache/types";
import CacheEmptyState from "./cache-empty-state";
import CacheTable from "./cache-table";

type CacheResultsProps = {
  references: number[];
  frameCount: number;
  policy: Policy;
  steps: CacheStep[];
  isAnswerVisible: boolean;
  frameAnswers: Record<string, string>;
  onFrameAnswer: (key: string, value: string) => void;
};

export default function CacheResults(props: CacheResultsProps) {
  if (props.references.length === 0) {
    return <CacheEmptyState />;
  }

  return <CacheTable {...props} />;
}
