import CacheFaultMark from "./cache-fault-mark";
import CacheHitMark from "./cache-hit-mark";
import CacheResultPlaceholder from "./cache-result-placeholder";

type CacheResultCellProps = {
  isAnswerVisible: boolean;
  isHit: boolean;
};

export default function CacheResultCell({ isAnswerVisible, isHit }: CacheResultCellProps) {
  if (!isAnswerVisible) {
    return <CacheResultPlaceholder />;
  }

  return isHit ? <CacheHitMark /> : <CacheFaultMark />;
}
