import type { BitOperation } from "../../service/bits/operations";

export const operationContent: Record<BitOperation, {
  title: string;
  symbol: string;
  description: string;
  intro: string;
}> = {
  sum: {
    title: "Sum",
    symbol: "+",
    description: "Addition combines the values.",
    intro: "Add two values and view the result in decimal and binary.",
  },
  subtract: {
    title: "Subtract",
    symbol: "−",
    description: "Subtraction finds the difference.",
    intro: "Subtract one value from another and inspect the result in binary.",
  },
  shl: {
    title: "Shift left (SHL)",
    symbol: "≪ 1",
    description: "A left shift moves every bit one place left (multiply by 2).",
    intro: "Shift every bit one place left, multiplying the value by two.",
  },
  shr: {
    title: "Shift right (SHR)",
    symbol: "≫ 1",
    description: "A right shift moves every bit one place right (divide by 2).",
    intro: "Shift every bit one place right, dividing the value by two.",
  },
};
