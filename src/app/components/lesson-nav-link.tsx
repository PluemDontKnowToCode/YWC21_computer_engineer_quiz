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
      title={title}
      aria-current={isCurrentLesson ? "page" : undefined}
    >
      <span aria-hidden="true">{code}</span>{label}
    </Link>
  );
}
