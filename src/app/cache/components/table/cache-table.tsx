import type { CacheStep, Policy } from "../../../../service/cache/types";
import CacheFrameCell from "./cache-frame-cell";

type CacheTableProps = {
  references: number[];
  frameCount: number;
  policy: Policy;
  steps: CacheStep[];
  isAnswerVisible: boolean;
  frameAnswers: Record<string, string>;
  onFrameAnswer: (key: string, value: string) => void;
};

export default function CacheTable({
  references,
  frameCount,
  policy,
  steps,
  isAnswerVisible,
  frameAnswers,
  onFrameAnswer,
}: CacheTableProps) {
  const events = steps.map((step, index) => {
    const previousFrames = steps[index - 1]?.frames ?? [];
    const frameIndex = step.hit
      ? step.frames.indexOf(step.page)
      : step.evicted === null
        ? previousFrames.length
        : previousFrames.indexOf(step.evicted);

    return { frameIndex, value: step.hit ? "+" : String(step.page) };
  });

  return (
    <div className="cache-table-wrap">
      <table className="cache-grid-table">
        <thead>
          <tr>
            <th className="cache-policy-title" colSpan={references.length + 1}>{policy}</th>
          </tr>
          <tr>
            <th className="row-name">Reference</th>
            {references.map((page, index) => (
              <th key={index}>{page}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: frameCount }, (_, frameIndex) => (
            <tr key={frameIndex}>
              <th className="row-name frame-number">{frameIndex + 1}</th>
              {events.map((event, index) => {
                const answerKey = `${policy}-${frameIndex}-${index}`;

                return (
                  <td key={index}>
                    <CacheFrameCell
                      isAnswerVisible={isAnswerVisible}
                      expectedValue={event.frameIndex === frameIndex ? event.value : undefined}
                      answer={frameAnswers[answerKey] ?? ""}
                      label={`${policy}, frame ${frameIndex + 1}, reference ${index + 1} (page ${references[index]})`}
                      onAnswerChange={(value) => onFrameAnswer(answerKey, value)}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="table-note">
        Enter the loaded page on a miss and + on a hit. Leave unchanged frames empty, then use <strong>Show answer</strong> to compare your work.
      </p>
    </div>
  );
}
