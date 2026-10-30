export type Policy = "FIFO" | "LRU" | "MIN" | "LFU";

export type CacheStep = {
  page: number;
  frames: number[];
  hit: boolean;
  evicted: number | null;
};
