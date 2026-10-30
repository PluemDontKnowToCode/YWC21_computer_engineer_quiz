import type { Policy } from "../../../../service/cache/types";

type CacheTakeawayProps = {
  policy: Policy;
};

const policyNotes: Record<Policy, { title: string; rule: string; reminder: string }> = {
  FIFO: {
    title: "Track arrival order",
    rule: "When all frames are full, replace the page that entered first.",
    reminder: "A hit does not make an older page new again.",
  },
  LRU: {
    title: "Track recent use",
    rule: "Replace the page whose last reference is farthest in the past.",
    reminder: "A hit updates recency, but does not change the page's frame.",
  },
  MIN: {
    title: "Look at future use",
    rule: "Replace the page whose next reference is farthest away.",
    reminder: "If a page is never referenced again, its next use is effectively farthest away.",
  },
  LFU: {
    title: "Count references",
    rule: "Replace the resident page with the smallest reference count.",
    reminder: "When counts tie, this lesson replaces the least recently used page. A reloaded page starts at one.",
  },
};

export default function CacheTakeaway({ policy }: CacheTakeawayProps) {
  const note = policyNotes[policy];

  return (
    <div className="takeaway">
      <div className="takeaway-icon">✦</div>
      <div>
        <strong>{note.title}</strong>
        <p>{note.rule}</p>
        <p>{note.reminder}</p>
      </div>
    </div>
  );
}
