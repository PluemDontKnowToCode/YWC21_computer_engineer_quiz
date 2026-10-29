"use client";

import { useState } from "react";
import { binary } from "../../service/learning-utils";

type Operation = "sum" | "subtract" | "shl" | "shr";

const operationSymbols: Record<Operation, string> = {
  sum: "+",
  subtract: "−",
  shl: "≪ 1",
  shr: "≫ 1",
};

const operationDescriptions: Record<Operation, string> = {
  sum: "Addition combines the values.",
  subtract: "Subtraction finds the difference.",
  shl: "A left shift moves every bit one place left (multiply by 2).",
  shr: "A right shift moves every bit one place right (divide by 2).",
};

const operationTitles: Record<Operation, string> = {
  sum: "Sum",
  subtract: "Subtract",
  shl: "Shift left (SHL)",
  shr: "Shift right (SHR)",
};

const calculate: Record<Operation, (left: number, right: number) => number> = {
  sum: (left, right) => left + right,
  subtract: (left, right) => left - right,
  shl: (left) => left << 1,
  shr: (left) => left >> 1,
};

export default function BitLesson({ operation }: { operation: Operation }) {
  const [left, setLeft] = useState(13);
  const [right, setRight] = useState(5);
  const result = calculate[operation](left, right);

  const updateNumber = (value: string, setter: (value: number) => void) => {
    setter(Math.max(0, Math.min(255, Number(value))));
  };

  return (
    <section className="lesson-section bit-section" id="bits">
      <div className="section-heading">
        <div className="section-number violet">02</div>
        <div>
          <div className="eyebrow">LOW-LEVEL LOGIC</div>
          <h2>{operationTitles[operation]}</h2>
        </div>
      </div>

      <p className="section-copy">
        Bits are the 1s and 0s computers use to store information. These operations let you change them directly.
      </p>

      <div className="bit-workbench">
        <div className="workbench-head">
          <div><span className="live-dot" /> {operation.toUpperCase()} · TRY IT YOURSELF</div>
          <span>8-bit view</span>
        </div>

        <div className="operand-row">
          <label>
            First number
            <input
              type="number"
              min="0"
              max="255"
              value={left}
              onChange={(event) => updateNumber(event.target.value, setLeft)}
            />
          </label>

          <div className="operand-binary">
            <span>BINARY</span>
            <code>{binary(left)}</code>
          </div>

          <div className="operand-operator">{operationSymbols[operation]}</div>

          <label>
            Second number
            <input
              type="number"
              min="0"
              max="255"
              value={right}
              onChange={(event) => updateNumber(event.target.value, setRight)}
            />
          </label>

          <div className="operand-binary">
            <span>BINARY</span>
            <code>{binary(right)}</code>
          </div>
        </div>

        <div className="result-row" aria-live="polite">
          <div><span>RESULT</span><strong>{result}</strong></div>
          <div><span>IN BINARY</span><code>{binary(result)}</code></div>
          <div className="result-explain">{operationDescriptions[operation]}</div>
        </div>

        <div className="bit-note">
          <span>TIP</span> A left shift by one is like multiplying by 2. A right shift by one is like dividing by 2 (for positive integers).
        </div>
      </div>
    </section>
  );
}
