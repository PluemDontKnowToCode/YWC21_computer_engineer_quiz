import type { CacheStep, Policy } from "../../../service/cache/types";
import CacheFaultSummary from "./cache-fault-summary";
import CacheFrameCell from "./cache-frame-cell";
import CacheResultCell from "./cache-result-cell";

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
  return (
    <div className="cache-table-wrap input-grid-wrap">
      <table className="cache-grid-table">
        <thead>
          <tr>
            <th className="row-name">{policy} · Frame</th>
            {references.map((page, index) => (
              <th key={index}><span>{page}</span><small>{index + 1}</small></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: frameCount }, (_, frameIndex) => (
            <tr key={frameIndex}>
              <th className="row-name">Frame {frameIndex + 1}</th>
              {references.map((_, index) => {
                const answerKey = `${policy}-${frameIndex}-${index}`;

                return (
                  <td key={index}>
                    <CacheFrameCell
                      isAnswerVisible={isAnswerVisible}
                      expectedValue={steps[index].frames[frameIndex]}
                      answer={frameAnswers[answerKey] ?? ""}
                      label={`${policy} frame ${frameIndex + 1}, reference ${index + 1}`}
                      onAnswerChange={(value) => onFrameAnswer(answerKey, value)}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="hit-row">
            <th className="row-name">Result</th>
            {steps.map((step, index) => (
              <td key={index}>
                <CacheResultCell isAnswerVisible={isAnswerVisible} isHit={step.hit} />
              </td>
            ))}
          </tr>
        </tbody>
        <CacheFaultSummary
          isAnswerVisible={isAnswerVisible}
          referencesCount={references.length}
          steps={steps}
          policy={policy}
        />
      </table>
      <p className="table-note">
        Enter the frame contents from left to right. A “+” marks a hit; “×” marks a page fault. Use <strong>Show answer</strong> to reveal the completed table.
      </p>
    </div>
  );
}
