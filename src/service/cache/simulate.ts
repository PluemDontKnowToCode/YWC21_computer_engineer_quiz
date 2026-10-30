import findFifoVictimIndex from "./policies/fifo";
import findLfuVictimIndex from "./policies/lfu";
import findLruVictimIndex from "./policies/lru";
import findMinVictimIndex from "./policies/min";
import type { EvictionStrategy } from "./policies/context";
import type { CacheStep, Policy } from "./types";

const evictionStrategies: Record<Policy, EvictionStrategy> = {
  FIFO: findFifoVictimIndex,
  LRU: findLruVictimIndex,
  MIN: findMinVictimIndex,
  LFU: findLfuVictimIndex,
};

export function simulate(policy: Policy, references: number[], capacity: number): CacheStep[] {
  const frames: number[] = [];
  const insertedAt = new Map<number, number>();
  const frequency = new Map<number, number>();
  const lastUsedAt = new Map<number, number>();
  const steps: CacheStep[] = [];

  references.forEach((page, index) => {
    if (frames.includes(page)) {
      updateHitStatistics(policy, page, index, frequency, lastUsedAt);
      steps.push({ page, frames: [...frames], hit: true, evicted: null });
      return;
    }

    let evicted: number | null = null;
    if (frames.length === capacity) {
      const victimIndex = evictionStrategies[policy]({
        frames,
        references,
        currentIndex: index,
        insertedAt,
        frequency,
        lastUsedAt,
      });
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

function updateHitStatistics(
  policy: Policy,
  page: number,
  index: number,
  frequency: Map<number, number>,
  lastUsedAt: Map<number, number>,
): void {
  if (policy !== "LFU") return;
  frequency.set(page, (frequency.get(page) ?? 0) + 1);
  lastUsedAt.set(page, index);
}
