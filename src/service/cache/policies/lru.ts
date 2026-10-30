import type { EvictionContext } from "./context";

export default function findLruVictimIndex({ frames, references, currentIndex }: EvictionContext): number {
  return frames.reduce((leastRecent, page, index) => {
    const lastUsed = references.slice(0, currentIndex).lastIndexOf(page);
    const leastUsed = references.slice(0, currentIndex).lastIndexOf(frames[leastRecent]);
    return lastUsed < leastUsed ? index : leastRecent;
  }, 0);
}
