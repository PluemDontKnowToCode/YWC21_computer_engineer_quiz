import type { EvictionContext } from "./context";

export default function findMinVictimIndex({ frames, references, currentIndex }: EvictionContext): number {
  return frames.reduce((farthest, page, index) => {
    const nextUse = references.indexOf(page, currentIndex + 1);
    const farthestUse = references.indexOf(frames[farthest], currentIndex + 1);
    return nextUse === -1 || (farthestUse !== -1 && nextUse > farthestUse) ? index : farthest;
  }, 0);
}
