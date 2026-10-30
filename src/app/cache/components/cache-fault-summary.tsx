import type { CacheStep, Policy } from "../../../service/cache/types";

type CacheFaultSummaryProps = {
  isAnswerVisible: boolean;
  referencesCount: number;
  steps: CacheStep[];
  policy: Policy;
};

export default function CacheFaultSummary({
  isAnswerVisible,
  referencesCount,
  steps,
  policy,
}: CacheFaultSummaryProps) {
  if (!isAnswerVisible) return null;

  const faultCount = steps.filter((step) => !step.hit).length;

  return (
    <tfoot>
      <tr>
        <th className="row-name">Page faults</th>
        <td colSpan={referencesCount} className="fault-total">
          {faultCount} faults with {policy}
        </td>
      </tr>
    </tfoot>
  );
}
