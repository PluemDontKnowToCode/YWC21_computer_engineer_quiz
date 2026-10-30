const MIN_PAGE_NUMBER = 0;
const MAX_PAGE_NUMBER = 99;
const MAX_REFERENCE_COUNT = 20;
const MIN_FRAME_COUNT = 1;
const MAX_FRAME_COUNT = 6;

export function parseReferences(input: string): number[] {
  return input.trim().split(/[ ,]+/).filter(Boolean).map(Number)
    .filter((value) => Number.isInteger(value) && value >= MIN_PAGE_NUMBER && value <= MAX_PAGE_NUMBER)
    .slice(0, MAX_REFERENCE_COUNT);
}

export function clampFrameCount(input: string): number {
  const parsedCount = Math.floor(Number(input) || MIN_FRAME_COUNT);
  return Math.max(MIN_FRAME_COUNT, Math.min(MAX_FRAME_COUNT, parsedCount));
}

export function makeReference(previous: string): string {
  let next = "";
  do {
    next = Array.from({ length: 8 }, () => String(Math.floor(Math.random() * 5) + 1)).join(" ");
  } while (next === previous);
  return next;
}
