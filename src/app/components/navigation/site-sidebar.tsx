import Link from "next/link";
import type { LessonTab } from "./lesson-types";
import LessonNavLink from "./lesson-nav-link";
import SidebarToggleButton from "./sidebar-toggle-button";

type SiteSidebarProps = {
  lesson: LessonTab | null;
  isExpanded: boolean;
  onToggle: () => void;
};

type LessonNavigationItem = {
  tab: LessonTab;
  code: string;
  label: string;
  title: string;
  href: string;
};

type LessonNavigationGroup = {
  title: string;
  items: LessonNavigationItem[];
};

const LESSON_GROUPS: LessonNavigationGroup[] = [
  {
    title: "Cache policies",
    items: [
      { tab: "fifo", code: "FI", label: "FIFO", title: "First in, first out", href: "/cache" },
      { tab: "lru", code: "LR", label: "LRU", title: "Least recently used", href: "/cache/lru" },
      { tab: "min", code: "MI", label: "MIN", title: "Farthest future use", href: "/cache/min" },
      { tab: "lfu", code: "LF", label: "LFU", title: "Least frequently used", href: "/cache/lfu" },
    ],
  },
  {
    title: "Bit operations",
    items: [
      { tab: "sum", code: "SU", label: "SUM", title: "Sum", href: "/bits" },
      { tab: "subtract", code: "SB", label: "SUBTRACT", title: "Subtract", href: "/bits/subtract" },
      { tab: "shl", code: "SL", label: "SHL", title: "Shift left", href: "/bits/shl" },
      { tab: "shr", code: "SR", label: "SHR", title: "Shift right", href: "/bits/shr" },
    ],
  },
  {
    title: "Number conversion",
    items: [
      {
        tab: "convert",
        code: "CV",
        label: "CONVERT",
        title: "Decimal, hexadecimal, and binary converter",
        href: "/bits/convert",
      },
    ],
  },
];

export default function SiteSidebar({ lesson, isExpanded, onToggle }: SiteSidebarProps) {
  return (
    <aside
      id="lesson-sidebar"
      className="sidebar"
      data-collapsed={!isExpanded}
    >
      <div className="sidebar-top">
        <SidebarToggleButton isExpanded={isExpanded} onToggle={onToggle} />
        <Link className="brand" href="/" aria-label="Bytewise home">
          <span className="brand-mark">CE</span>
          <span>bytewise<small>THE LEARNING LAB</small></span>
        </Link>
      </div>
      {LESSON_GROUPS.map((group) => (
        <div className="lesson-group" key={group.title}>
          <div className="side-label lesson-group-label">{group.title}</div>
          <nav className="lesson-nav" aria-label={group.title}>
            {group.items.map((item) => (
              <LessonNavLink
                key={item.tab}
                lesson={lesson}
                {...item}
              />
            ))}
          </nav>
        </div>
      ))}
    </aside>
  );
}
