export type Policy = "FIFO" | "LRU" | "MIN" | "LFU";

export type CacheStep = {
  page: number;
  frames: number[];
  hit: boolean;
  evicted: number | null;
};

export function simulate(policy: Policy, references: number[], capacity: number): CacheStep[] {
  const frames: number[] = [];
  const insertedAt = new Map<number, number>();
  const frequency = new Map<number, number>();
  const lastUsedAt = new Map<number, number>();
  const steps: CacheStep[] = [];

  references.forEach((page, index) => {
    const existing = frames.indexOf(page);
    if (existing !== -1) {
      if (policy === "LFU") {
        frequency.set(page, (frequency.get(page) ?? 0) + 1);
        lastUsedAt.set(page, index);
      }
      steps.push({ page, frames: [...frames], hit: true, evicted: null });
      return;
    }

    let evicted: number | null = null;
    if (frames.length === capacity) {
      let victimIndex = 0;
      if (policy === "FIFO") {
        victimIndex = frames.reduce((oldest, value, frameIndex) =>
          (insertedAt.get(value) ?? 0) < (insertedAt.get(frames[oldest]) ?? 0) ? frameIndex : oldest, 0);
      } else if (policy === "LRU") {
        victimIndex = frames.reduce((leastRecent, value, frameIndex) => {
          const lastUsed = references.slice(0, index).lastIndexOf(value);
          const leastUsed = references.slice(0, index).lastIndexOf(frames[leastRecent]);
          return lastUsed < leastUsed ? frameIndex : leastRecent;
        }, 0);
      } else if (policy === "MIN") {
        victimIndex = frames.reduce((farthest, value, frameIndex) => {
          const nextUse = references.indexOf(value, index + 1);
          const farthestUse = references.indexOf(frames[farthest], index + 1);
          return nextUse === -1 || (farthestUse !== -1 && nextUse > farthestUse) ? frameIndex : farthest;
        }, 0);
      } else {
        victimIndex = frames.reduce((leastUsed, value, frameIndex) => {
          const valueFrequency = frequency.get(value) ?? 0;
          const leastFrequency = frequency.get(frames[leastUsed]) ?? 0;
          const valueLastUsed = lastUsedAt.get(value) ?? -1;
          const leastLastUsed = lastUsedAt.get(frames[leastUsed]) ?? -1;
          return valueFrequency < leastFrequency ||
            (valueFrequency === leastFrequency && valueLastUsed < leastLastUsed)
            ? frameIndex
            : leastUsed;
        }, 0);
      }
      evicted = frames[victimIndex];
      frames.splice(victimIndex, 1);
      frequency.delete(evicted);
      lastUsedAt.delete(evicted);
    }

    frames.push(page);
    insertedAt.set(page, index);
    frequency.set(page, 1);
    lastUsedAt.set(page, index);
    steps.push({ page, frames: [...frames], hit: false, evicted });
  });

  return steps;
}

export function makeReference(previous: string) {
  let next = "";
  do {
    next = Array.from({ length: 8 }, () => String(Math.floor(Math.random() * 5) + 1)).join(" ");
  } while (next === previous);
  return next;
}

export const binary = (n: number) => (n >>> 0).toString(2).padStart(8, "0").slice(-8);
