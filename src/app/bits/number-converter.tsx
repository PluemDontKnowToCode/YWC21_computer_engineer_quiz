"use client";

import { useState } from "react";

const formatValue = (value: number) => ({
  decimal: String(value),
  hex: value.toString(16).toUpperCase().padStart(2, "0"),
  binary: value.toString(2).padStart(8, "0"),
});

export default function NumberConverter() {
  const [values, setValues] = useState(formatValue(13));

  const updateDecimal = (decimal: string) => {
    setValues((current) => ({ ...current, decimal }));
    if (!/^\d{1,3}$/.test(decimal)) return;
    const value = Number(decimal);
    if (value <= 255) setValues(formatValue(value));
  };

  const updateHex = (hex: string) => {
    const normalized = hex.toUpperCase();
    setValues((current) => ({ ...current, hex: normalized }));
    const digits = normalized.replace(/^0X/, "");
    if (!/^[\da-f]{1,2}$/i.test(digits)) return;
    setValues({ ...formatValue(Number.parseInt(digits, 16)), hex: normalized });
  };

  const updateBinary = (binary: string) => {
    setValues((current) => ({ ...current, binary }));
    if (!/^[01]{1,8}$/.test(binary)) return;
    setValues({ ...formatValue(Number.parseInt(binary, 2)), binary });
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
        Enter a value in any field to convert it to the other two formats. This converter uses unsigned 8-bit values from 0 to 255.
      </p>

      <div className="number-converter">
        <label className="converter-field">
          <span>DECIMAL</span>
          <input
            aria-label="Decimal value from 0 to 255"
            inputMode="numeric"
            value={values.decimal}
            onChange={(event) => updateDecimal(event.target.value)}
          />
        </label>

        <label className="converter-field">
          <span>HEXADECIMAL</span>
          <input
            aria-label="Hexadecimal value"
            autoCapitalize="characters"
            value={values.hex}
            onChange={(event) => updateHex(event.target.value)}
          />
        </label>

        <label className="converter-field">
          <span>BINARY</span>
          <input
            aria-label="Binary value"
            inputMode="numeric"
            value={values.binary}
            onChange={(event) => updateBinary(event.target.value)}
          />
        </label>
      </div>
      <p className="sequence-caption">Hex accepts 00–FF. Binary accepts up to 8 bits.</p>
    </section>
  );
}
