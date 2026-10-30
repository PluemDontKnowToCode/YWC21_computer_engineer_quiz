export type EvictionContext = {
  frames: number[];
  references: number[];
  currentIndex: number;
  insertedAt: Map<number, number>;
  frequency: Map<number, number>;
  lastUsedAt: Map<number, number>;
};

export type EvictionStrategy = (context: EvictionContext) => number;
