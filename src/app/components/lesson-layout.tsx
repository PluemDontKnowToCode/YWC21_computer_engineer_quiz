"use client";

import { useState, type ReactNode } from "react";
import SiteSidebar from "./site-sidebar";
import type { LessonTab } from "./lesson-types";

type LessonLayoutProps = {
  lesson: LessonTab;
  kicker: string;
  intro: string;
  children: ReactNode;
};

export default function LessonLayout({ lesson, kicker, intro, children }: LessonLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <main className="site-shell">
      <SiteSidebar
        lesson={lesson}
        isExpanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded((expanded) => !expanded)}
      />
      <div className="main-column" id="top">
        <div className="content-wrap">
          <div className="lesson-toolbar">
            <div className="module-kicker">
              <span className="spark">✳</span>
              <span className="kicker-dot">·</span> {kicker}
            </div>
          </div>
          <p className="intro">{intro}</p>
          {children}
        </div>
      </div>
    </main>
  );
}
