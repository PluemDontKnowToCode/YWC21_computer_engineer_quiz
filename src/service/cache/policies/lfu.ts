import type { EvictionContext } from "./context";

export default function findLfuVictimIndex({ frames, frequency, lastUsedAt }: EvictionContext): number {
  return frames.reduce((leastUsed, page, index) => {
    const pageFrequency = frequency.get(page) ?? 0;
    const leastFrequency = frequency.get(frames[leastUsed]) ?? 0;
    const pageLastUsed = lastUsedAt.get(page) ?? -1;
    const leastLastUsed = lastUsedAt.get(frames[leastUsed]) ?? -1;
    return pageFrequency < leastFrequency ||
      (pageFrequency === leastFrequency && pageLastUsed < leastLastUsed)
      ? index
      : leastUsed;
  }, 0);
}
