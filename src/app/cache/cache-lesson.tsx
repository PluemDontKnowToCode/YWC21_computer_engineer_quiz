"use client";

import { useState } from "react";
import { makeReference, simulate, type Policy } from "../../service/learning-utils";

export default function CacheLesson({ policy }: { policy: Policy }) {
  const [referenceInput, setReferenceInput] = useState("1 2 3 4 1 2 5 1 2 3 4 5");
  const [frameCount, setFrameCount] = useState(3);
  const [showAnswer, setShowAnswer] = useState(false);
  const [frameAnswers, setFrameAnswers] = useState<Record<string, string>>({});

  const references = referenceInput.trim().split(/[ ,]+/).filter(Boolean).map(Number)
    .filter((value) => Number.isInteger(value) && value >= 0 && value <= 99).slice(0, 20);
  const activeResults = simulate(policy, references, frameCount);

  return (
    <section className="lesson-section" id="cache">
      <div className="section-heading">
        <div className="section-number">01</div>
        <div>
          <div className="eyebrow">MEMORY MANAGEMENT</div>
          <h2>{policy} replacement policy</h2>
        </div>
      </div>

      <p className="section-copy">
        When the cache is full, this policy chooses which page to remove. Set the frame count and reference sequence, then enter the cache contents as each reference arrives.
      </p>

      <div className="cache-input-panel">
        <label className="cache-input-label">
          REFERENCE STRING <span>Enter page numbers separated by spaces or commas</span>
          <input
            aria-label="Reference string"
            value={referenceInput}
            onChange={(event) => {
              setReferenceInput(event.target.value);
              setShowAnswer(false);
            }}
          />
        </label>

        <label className="cache-input-label frame-input-label">
          FRAMES
          <input
            aria-label="Number of cache frames"
            type="number"
            min="1"
            max="6"
            value={frameCount}
            onChange={(event) => {
              setFrameCount(Math.floor(Math.max(1, Math.min(6, Number(event.target.value) || 1))));
              setShowAnswer(false);
            }}
          />
        </label>

        <button
          className="randomize-button"
          onClick={() => {
            setReferenceInput((current) => makeReference(current));
            setShowAnswer(false);
            setFrameAnswers({});
          }}
        >
          New Challenge
        </button>

        <button className="show-cache-answer" onClick={() => setShowAnswer((visible) => !visible)}>
          {showAnswer ? "Hide answer" : "Show answer"}
          <span>{showAnswer ? "−" : "＋"}</span>
        </button>
      </div>

      <p className="sequence-caption">
        {references.length} references · {frameCount} cache frames · each new challenge shuffles the reference string
      </p>

      <div className="cache-policy-panel">
      {references.length > 0 && (
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
                    const expected = activeResults[index].frames[frameIndex];
                    const answerKey = `${policy}-${frameIndex}-${index}`;
                    return (
                      <td key={index}>
                        {showAnswer ? (
                          <span className="answer-cell">{expected ?? "–"}</span>
                        ) : (
                          <input
                            aria-label={`${policy} frame ${frameIndex + 1}, reference ${index + 1}`}
                            className="frame-answer-input"
                            value={frameAnswers[answerKey] ?? ""}
                            maxLength={2}
                            onChange={(event) => setFrameAnswers((current) => ({
                              ...current,
                              [answerKey]: event.target.value.toUpperCase(),
                            }))}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="hit-row">
                <th className="row-name">Result</th>
                {references.map((_, index) => (
                  <td key={index}>
                    {showAnswer ? (
                      <span className={activeResults[index].hit ? "hit-mark" : "fault-mark"}>
                        {activeResults[index].hit ? "+" : "×"}
                      </span>
                    ) : (
                      <span className="result-placeholder">hit?</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
            {showAnswer && (
              <tfoot>
                <tr>
                  <th className="row-name">Page faults</th>
                  <td colSpan={references.length} className="fault-total">
                    {activeResults.filter((step) => !step.hit).length} faults with {policy}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
          <p className="table-note">
            Enter the frame contents from left to right. A “+” marks a hit; “×” marks a page fault. Use <strong>Show answer</strong> to reveal the completed table.
          </p>
        </div>
      )}

      {references.length === 0 && <p className="input-error">Enter at least one page number from 0 to 99.</p>}
      </div>

      <div className="takeaway">
        <div className="takeaway-icon">✦</div>
        <div>
          <strong>A quick way to remember</strong>
          <p>FIFO tracks <em>arrival</em>. LRU tracks <em>recent use</em>. MIN looks ahead; LFU counts <em>frequency</em>.</p>
        </div>
      </div>
    </section>
  );
}
