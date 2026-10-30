"use client";

import { useState, type ReactNode } from "react";
import SiteSidebar from "../navigation/site-sidebar";

type WelcomeLayoutProps = {
  children: ReactNode;
};

export default function WelcomeLayout({ children }: WelcomeLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="site-shell">
      <SiteSidebar
        lesson={null}
        isExpanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded((expanded) => !expanded)}
      />
      {children}
    </div>
  );
}
