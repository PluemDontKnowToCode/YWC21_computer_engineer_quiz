import Link from "next/link";
import type { LessonTab } from "./lesson-types";

type LessonNavLinkProps = {
  lesson: LessonTab | null;
  tab: LessonTab;
  code: string;
  label: string;
  title: string;
  href: string;
};

export default function LessonNavLink({ lesson, tab, code, label, title, href }: LessonNavLinkProps) {
  const isCurrentLesson = lesson === tab;
  const className = isCurrentLesson ? "nav-item current" : "nav-item";

  return (
    <Link
      className={className}
      href={href}
      aria-label={`${label}: ${title}`}
      title={title}
      aria-current={isCurrentLesson ? "page" : undefined}
    >
      <span className="nav-code" aria-hidden="true">{code}</span>
      <span className="nav-item-copy">
        <span className="nav-item-label">{label}</span>
        <small className="nav-item-title">{title}</small>
      </span>
    </Link>
  );
}
