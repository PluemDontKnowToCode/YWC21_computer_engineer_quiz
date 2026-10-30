import type { EvictionContext } from "./context";

export default function findFifoVictimIndex({ frames, insertedAt }: EvictionContext): number {
  return frames.reduce((oldest, page, index) =>
    (insertedAt.get(page) ?? 0) < (insertedAt.get(frames[oldest]) ?? 0) ? index : oldest, 0);
}
