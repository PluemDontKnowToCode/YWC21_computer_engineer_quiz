import type { BitOperation } from "../../../../service/bits/operations";

export const operationContent: Record<BitOperation, {
  title: string;
  symbol: string;
  description: string;
  intro: string;
  tip: string;
}> = {
  sum: {
    title: "Sum",
    symbol: "+",
    description: "Add matching place values from right to left. If a column totals 2 or 3, write the remainder bit and carry 1.",
    intro: "Add the decimal values, then compare the result with its 8-bit binary form. Watch how a carry moves between bit positions.",
    tip: "Example: 00001101 + 00000101 = 00010010 (13 + 5 = 18). In a column with two 1s, write 0 and carry 1 to the next column. The binary panel keeps only the low 8 bits if the sum exceeds 255.",
  },
  subtract: {
    title: "Subtract",
    symbol: "−",
    description: "Subtract matching place values from right to left; borrow from the next column when the top bit is too small.",
    intro: "Subtract the second value from the first and compare the decimal difference with its 8-bit binary form.",
    tip: "Example: 00001101 − 00000101 = 00001000 (13 − 5 = 8). If the first value is smaller, the binary display shows the low 8 bits in two's-complement form.",
  },
  shl: {
    title: "Shift left (SHL)",
    symbol: "≪ 1",
    description: "Move each bit one place left and fill the rightmost position with 0; the decimal value doubles.",
    intro: "Move the bits one position left. Compare the doubled decimal result with the 8-bit output, where an overflow bit can be dropped.",
    tip: "Example: 00001101 ≪ 1 = 00011010 (13 becomes 26). The right side gets a 0; any bit shifted beyond the left edge is not shown in the 8-bit result.",
  },
  shr: {
    title: "Shift right (SHR)",
    symbol: "≫ 1",
    description: "Move each bit one place right and fill the leftmost position with 0; the dropped rightmost bit is discarded.",
    intro: "Move the bits one position right. For these unsigned values, the result is the original value divided by two and rounded down.",
    tip: "Example: 00001101 ≫ 1 = 00000110 (13 becomes 6). The rightmost 1 is dropped, so an odd value loses its remainder when divided by 2.",
  },
};
