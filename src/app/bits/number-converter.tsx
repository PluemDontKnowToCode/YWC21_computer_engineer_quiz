"use client";

import { useState } from "react";
import {
  formatNumber,
  parseBinaryInput,
  parseDecimalInput,
  parseHexInput,
} from "../../service/bits/number-conversion";
import ConverterField from "./components/converter-field";

export default function NumberConverter() {
  const [values, setValues] = useState(formatNumber(13));

  const updateDecimal = (decimal: string) => {
    setValues((current) => ({ ...current, decimal }));
    const value = parseDecimalInput(decimal);
    if (value !== null) setValues(formatNumber(value));
  };

  const updateHex = (hex: string) => {
    const normalized = hex.toUpperCase();
    setValues((current) => ({ ...current, hex: normalized }));
    const value = parseHexInput(normalized);
    if (value !== null) setValues({ ...formatNumber(value), hex: normalized });
  };

  const updateBinary = (binary: string) => {
    setValues((current) => ({ ...current, binary }));
    const value = parseBinaryInput(binary);
    if (value !== null) setValues({ ...formatNumber(value), binary });
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
        <ConverterField
          label="DECIMAL"
          ariaLabel="Decimal value from 0 to 255"
          inputMode="numeric"
          value={values.decimal}
          onChange={updateDecimal}
        />
        <ConverterField
          label="HEXADECIMAL"
          ariaLabel="Hexadecimal value"
          autoCapitalize="characters"
          value={values.hex}
          onChange={updateHex}
        />
        <ConverterField
          label="BINARY"
          ariaLabel="Binary value"
          inputMode="numeric"
          value={values.binary}
          onChange={updateBinary}
        />
      </div>
      <p className="sequence-caption">Hex accepts 00–FF. Binary accepts up to 8 bits.</p>
    </section>
  );
}
