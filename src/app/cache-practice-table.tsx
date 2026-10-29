"use client";

import type { CacheStep, Policy } from "./learning-utils";

type CachePracticeTableProps = {
  references: number[];
  frameCount: number;
  policy: Policy;
  cacheResults: Record<Policy, CacheStep[]>;
  showAnswer: boolean;
  frameAnswers: Record<string, string>;
  onFrameAnswer: (key: string, value: string) => void;
};

function renderFrameCell(showAnswer: boolean, expected: number | undefined, answer: string, onChange: (value: string) => void) {
  if (showAnswer) {
    return <span className="answer-cell">{expected ?? "–"}</span>;
  }

  return <input
    aria-label="Cache frame answer"
    className="frame-answer-input"
    value={answer}
    maxLength={2}
    onChange={(event) => onChange(event.target.value.toUpperCase())}
  />;
}

function renderResultCell(showAnswer: boolean, hit: boolean) {
  if (!showAnswer) {
    return <span className="result-placeholder">hit?</span>;
  }

  if (hit) {
    return <span className="hit-mark">+</span>;
  }

  return null;
}

function renderFaultSummary(showAnswer: boolean, references: number[], steps: CacheStep[], policy: Policy) {
  if (!showAnswer) return null;

  const faults = steps.filter((step) => !step.hit).length;
  return <tfoot><tr><th className="row-name">Page faults</th><td colSpan={references.length} className="fault-total">{faults} faults with {policy}</td></tr></tfoot>;
}

export default function CachePracticeTable(props: CachePracticeTableProps) {
  const { references, frameCount, policy, cacheResults, showAnswer, frameAnswers, onFrameAnswer } = props;

  if (references.length === 0) {
    return <p className="input-error">Enter at least one page number from 0 to 99.</p>;
  }

  const steps = cacheResults[policy];

  return <div className="cache-table-wrap input-grid-wrap" aria-live="polite">
    <table className="cache-grid-table">
      <thead><tr><th className="row-name">{policy} · Frame</th>{references.map((page, index) => <th key={index}><span>{page}</span><small>{index + 1}</small></th>)}</tr></thead>
      <tbody>
        {Array.from({ length: frameCount }, (_, frameIndex) => <tr key={frameIndex}>
          <th className="row-name">Frame {frameIndex + 1}</th>
          {references.map((_, index) => {
            const answerKey = `${policy}-${frameIndex}-${index}`;
            return <td key={index}>{renderFrameCell(showAnswer, steps[index].frames[frameIndex], frameAnswers[answerKey] ?? "", (value) => onFrameAnswer(answerKey, value))}</td>;
          })}
        </tr>)}
        <tr className="hit-row"><th className="row-name">Result</th>{steps.map((step, index) => <td key={index}>{renderResultCell(showAnswer, step.hit)}</td>)}</tr>
      </tbody>
      {renderFaultSummary(showAnswer, references, steps, policy)}
    </table>
    <p className="table-note">Enter the frame contents from left to right. A “+” marks a cache hit; a blank result cell marks a page fault. Use <strong>Show answer</strong> to reveal the completed table.</p>
  </div>;
}
