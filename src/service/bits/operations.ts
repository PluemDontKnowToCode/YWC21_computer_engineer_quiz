export type BitOperation = "sum" | "subtract" | "shl" | "shr";

const MIN_OPERAND = 0;
const MAX_OPERAND = 255;

const operationCalculations: Record<BitOperation, (left: number, right: number) => number> = {
  sum: (left, right) => left + right,
  subtract: (left, right) => left - right,
  shl: (left) => left << 1,
  shr: (left) => left >> 1,
};

export function calculateBitOperation(operation: BitOperation, left: number, right: number): number {
  return operationCalculations[operation](left, right);
}

export function clampUnsignedByte(input: string): number {
  const value = Number(input);
  return Math.max(MIN_OPERAND, Math.min(MAX_OPERAND, value));
}
