"use client";

import { useState } from "react";
import {
  formatForBase,
  isNumberBase,
  parseNumberInput,
  type NumberBase,
} from "../../service/bits/number-conversion";
import ConverterField from "./components/converter/converter-field";

const BASE_LABELS: Record<NumberBase, string> = {
  decimal: "Decimal",
  hex: "Hexadecimal",
  binary: "Binary",
};
const NUMBER_BASES: NumberBase[] = ["decimal", "hex", "binary"];

export default function NumberConverter() {
  const [sourceValue, setSourceValue] = useState("13");
  const [sourceBase, setSourceBase] = useState<NumberBase>("decimal");
  const [targetBase, setTargetBase] = useState<NumberBase>("binary");
  const [answer, setAnswer] = useState("");
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const sourceNumber = parseNumberInput(sourceValue, sourceBase);
  const expectedAnswer = sourceNumber === null ? "" : formatForBase(sourceNumber, targetBase);

  const handleSourceValueChange = (value: string) => {
    setSourceValue(value);
    setAnswer("");
    setIsAnswerVisible(false);
  };

  const handleTargetBaseChange = (base: string) => {
    if (!isNumberBase(base)) return;
    if (base === sourceBase) return;
    setTargetBase(base);
    setAnswer("");
    setIsAnswerVisible(false);
  };

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    setIsAnswerVisible(false);
  };

  const handleToggleAnswer = () => {
    if (isAnswerVisible) {
      setAnswer("");
      setIsAnswerVisible(false);
      return;
    }

    if (sourceNumber === null) return;
    setAnswer(expectedAnswer);
    setIsAnswerVisible(true);
  };

  const handleSwapConversion = () => {
    const outputValue = isAnswerVisible ? expectedAnswer : answer;
    setSourceBase(targetBase);
    setTargetBase(sourceBase);
    setSourceValue(outputValue);
    setAnswer(sourceValue);
    setIsAnswerVisible(false);
  };

  const handleSourceBaseChange = (base: string) => {
    if (!isNumberBase(base)) return;
    setSourceBase(base);
    if (base === targetBase) setTargetBase(sourceBase);
    setAnswer("");
    setIsAnswerVisible(false);
  };

  return (
    <section className="lesson-section bit-section" id="convert">
      <div className="section-heading">
        <div className="section-number violet">03</div>
        <div>
          <div className="eyebrow">NUMBER REPRESENTATION</div>
          <h2>Decimal, hexadecimal, and binary</h2>
        </div>
      </div>

      <p className="section-copy">
        Choose an input and output base, then enter your answer below. This exercise uses unsigned 8-bit values from 0 to 255.
      </p>

      <div className="conversion-exercise">
        <div className="conversion-converter">
          <div className="conversion-side">
            <label className="converter-field">
              <span>INPUT · CONVERT FROM</span>
              <select
                aria-label="Input number base"
                value={sourceBase}
                onChange={(event) => handleSourceBaseChange(event.target.value)}
              >
                {NUMBER_BASES.map((base) => (
                  <option key={base} value={base}>{BASE_LABELS[base]}</option>
                ))}
              </select>
            </label>
            <ConverterField
              label="INPUT VALUE"
              ariaLabel={`Input value in ${BASE_LABELS[sourceBase]}`}
              inputMode={sourceBase === "hex" ? undefined : "numeric"}
              autoCapitalize={sourceBase === "hex" ? "characters" : undefined}
              value={sourceValue}
              onChange={handleSourceValueChange}
            />
          </div>

          <div className="conversion-controls">
            <button
              className="conversion-swap"
              type="button"
              aria-label="Swap input and output"
              title="Swap input and output"
              onClick={handleSwapConversion}
            >
              ⇅
            </button>
            <button
              className="show-cache-answer conversion-answer-toggle"
              type="button"
              disabled={sourceNumber === null}
              onClick={handleToggleAnswer}
            >
              {isAnswerVisible ? "Hide answer" : "Show answer"}
              <span aria-hidden="true">{isAnswerVisible ? "−" : "+"}</span>
            </button>
          </div>

          <div className="conversion-side">
            <label className="converter-field">
              <span>OUTPUT · CONVERT TO</span>
              <select
                aria-label="Output number base"
                value={targetBase}
                onChange={(event) => handleTargetBaseChange(event.target.value)}
              >
                {NUMBER_BASES.map((base) => (
                  <option key={base} value={base} disabled={base === sourceBase}>
                    {BASE_LABELS[base]}
                  </option>
                ))}
              </select>
            </label>
            <ConverterField
              label="YOUR ANSWER"
              ariaLabel={`Your ${BASE_LABELS[targetBase]} answer`}
              inputMode={targetBase === "hex" ? undefined : "numeric"}
              autoCapitalize={targetBase === "hex" ? "characters" : undefined}
              value={answer}
              onChange={handleAnswerChange}
            />
          </div>
        </div>

        {sourceValue && sourceNumber === null && (
          <p className="conversion-error">Enter a valid {BASE_LABELS[sourceBase]} value from 0 to 255.</p>
        )}
      </div>

      <p className="sequence-caption">Hex accepts 00–FF. Binary accepts up to 8 bits; leading zeros are optional in your answer.</p>
      <div className="takeaway conversion-example">
        <div className="takeaway-icon" aria-hidden="true">✦</div>
        <div>
          <strong>Read the same value in three bases</strong>
          <p>Decimal 13 = binary 00001101 = hexadecimal 0D. The 1s in 00001101 represent 8 + 4 + 1; the hex digit D represents 13.</p>
        </div>
      </div>
    </section>
  );
}
