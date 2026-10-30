type NumberFormats = {
  decimal: string;
  hex: string;
  binary: string;
};

export type NumberBase = keyof NumberFormats;

export function isNumberBase(value: string): value is NumberBase {
  return value === "decimal" || value === "hex" || value === "binary";
}

function formatNumber(value: number): NumberFormats {
  return {
    decimal: String(value),
    hex: value.toString(16).toUpperCase().padStart(2, "0"),
    binary: value.toString(2).padStart(8, "0"),
  };
}

function parseDecimalInput(input: string): number | null {
  if (!/^\d{1,3}$/.test(input)) return null;
  const value = Number(input);
  return value <= 255 ? value : null;
}

function parseHexInput(input: string): number | null {
  const digits = input.toUpperCase().replace(/^0X/, "");
  if (!/^[\da-f]{1,2}$/i.test(digits)) return null;
  return Number.parseInt(digits, 16);
}

function parseBinaryInput(input: string): number | null {
  if (!/^[01]{1,8}$/.test(input)) return null;
  return Number.parseInt(input, 2);
}

export function parseNumberInput(input: string, base: NumberBase): number | null {
  if (base === "decimal") return parseDecimalInput(input);
  if (base === "hex") return parseHexInput(input);
  return parseBinaryInput(input);
}

export function formatForBase(value: number, base: NumberBase): string {
  return formatNumber(value)[base];
}
