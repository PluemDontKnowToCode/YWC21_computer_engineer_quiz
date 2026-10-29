export type Policy = "FIFO" | "LRU" | "MIN";
export type Operation = "add" | "subtract" | "right" | "left";

export type CacheStep = {
  page: number;
  frames: number[];
  hit: boolean;
  evicted: number | null;
};

export function simulate(policy: Policy, references: number[], capacity: number): CacheStep[] {
  const frames: number[] = [];
  const insertedAt = new Map<number, number>();
  const steps: CacheStep[] = [];

  references.forEach((page, index) => {
    if (frames.includes(page)) {
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
      } else {
        victimIndex = frames.reduce((farthest, value, frameIndex) => {
          const nextUse = references.indexOf(value, index + 1);
          const farthestUse = references.indexOf(frames[farthest], index + 1);
          return nextUse === -1 || (farthestUse !== -1 && nextUse > farthestUse) ? frameIndex : farthest;
        }, 0);
      }
      evicted = frames[victimIndex];
      frames.splice(victimIndex, 1);
    }

    frames.push(page);
    insertedAt.set(page, index);
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

export const binary = (value: number) => (value >>> 0).toString(2).padStart(8, "0").slice(-8);

export function policyDescription(policy: Policy) {
  switch (policy) {
    case "FIFO": return "First in, first out";
    case "LRU": return "Least recently used";
    case "MIN": return "Farthest future use";
  }
}

export function operationSymbol(operation: Operation) {
  switch (operation) {
    case "add": return "+";
    case "subtract": return "−";
    case "right": return "≫ 1";
    case "left": return "≪ 1";
  }
}

export function operationExplanation(operation: Operation) {
  switch (operation) {
    case "add": return "Addition combines the values.";
    case "subtract": return "Subtraction finds the difference.";
    case "right": return "A right shift moves every bit one place right (divide by 2).";
    case "left": return "A left shift moves every bit one place left (multiply by 2).";
  }
}

export function navigationClass(isActive: boolean) {
  return isActive ? "nav-item current" : "nav-item";
}

export function policyTabClass(isActive: boolean) {
  return isActive ? "policy-tab active" : "policy-tab";
}

export function operationButtonClass(isActive: boolean) {
  return isActive ? "op-active" : "";
}

export function answerButtonLabel(isVisible: boolean) {
  return isVisible ? "Hide answer" : "Show answer";
}

export function answerButtonSymbol(isVisible: boolean) {
  return isVisible ? "−" : "＋";
}
