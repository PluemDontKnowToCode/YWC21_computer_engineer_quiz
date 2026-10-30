"use client";

import { useState } from "react";
import { calculateBitOperation, clampUnsignedByte, type BitOperation } from "../../service/bits/operations";
import { binary } from "../../service/bits/binary-format";
import BitOperands from "./components/bit-operands";
import BitLessonHeading from "./components/bit-lesson-heading";
import BitResultSummary from "./components/bit-result-summary";
import BitTip from "./components/bit-tip";
import { operationContent } from "./operation-content";

export default function BitLesson({ operation }: { operation: BitOperation }) {
  const [left, setLeft] = useState(13);
  const [right, setRight] = useState(5);
  const content = operationContent[operation];
  const result = calculateBitOperation(operation, left, right);

  const handleNumberChange = (value: string, setNumber: (next: number) => void) => {
    setNumber(clampUnsignedByte(value));
  };

  return (
    <section className="lesson-section bit-section" id="bits">
      <BitLessonHeading title={content.title} />
      <p className="section-copy">
        Bits are the 1s and 0s computers use to store information. These operations let you change them directly.
      </p>

      <div className="bit-workbench">
        <div className="workbench-head">
          <div><span className="live-dot" /> {operation.toUpperCase()} · TRY IT YOURSELF</div>
          <span>8-bit view</span>
        </div>

        <BitOperands
          left={left}
          right={right}
          leftBinary={binary(left)}
          rightBinary={binary(right)}
          operator={content.symbol}
          onLeftChange={(value) => handleNumberChange(value, setLeft)}
          onRightChange={(value) => handleNumberChange(value, setRight)}
        />

        <BitResultSummary
          result={result}
          binaryResult={binary(result)}
          description={content.description}
        />
        <BitTip />
      </div>
    </section>
  );
}
