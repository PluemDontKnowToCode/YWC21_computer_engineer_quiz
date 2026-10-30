export type NumberFormats = {
  decimal: string;
  hex: string;
  binary: string;
};

export function formatNumber(value: number): NumberFormats {
  return {
    decimal: String(value),
    hex: value.toString(16).toUpperCase().padStart(2, "0"),
    binary: value.toString(2).padStart(8, "0"),
  };
}

export function parseDecimalInput(input: string): number | null {
  if (!/^\d{1,3}$/.test(input)) return null;
  const value = Number(input);
  return value <= 255 ? value : null;
}

export function parseHexInput(input: string): number | null {
  const digits = input.toUpperCase().replace(/^0X/, "");
  if (!/^[\da-f]{1,2}$/i.test(digits)) return null;
  return Number.parseInt(digits, 16);
}

export function parseBinaryInput(input: string): number | null {
  if (!/^[01]{1,8}$/.test(input)) return null;
  return Number.parseInt(input, 2);
}
