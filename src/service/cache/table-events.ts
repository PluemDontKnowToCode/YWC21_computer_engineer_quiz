import type { CacheStep } from "./types";

const HIT_MARKER = "+";

type CacheTableEvent = {
  frameIndex: number;
  value: string;
};

export function buildCacheTableEvents(
  steps: CacheStep[],
): CacheTableEvent[] {
  return steps.map((step, index) => {
    const previousFrames = steps[index - 1]?.frames ?? [];

    return {
      frameIndex: getEventFrameIndex(step, previousFrames),
      value: step.hit ? HIT_MARKER : String(step.page),
    };
  });
}

function getEventFrameIndex(step: CacheStep, previousFrames: number[]): number {
  if (step.hit) return step.frames.indexOf(step.page);
  if (step.evicted === null) return previousFrames.length;
  return previousFrames.indexOf(step.evicted);
}
