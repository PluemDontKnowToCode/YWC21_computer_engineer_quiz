type SidebarToggleButtonProps = {
  isExpanded: boolean;
  onToggle: () => void;
};

export default function SidebarToggleButton({ isExpanded, onToggle }: SidebarToggleButtonProps) {
  const label = isExpanded ? "Collapse sidebar" : "Expand sidebar";
  const symbol = isExpanded ? "‹" : "›";

  return (
    <button
      className="sidebar-toggle"
      type="button"
      aria-label={label}
      aria-expanded={isExpanded}
      aria-controls="lesson-sidebar"
      onClick={onToggle}
    >
      <span aria-hidden="true">{symbol}</span>
    </button>
  );
}
