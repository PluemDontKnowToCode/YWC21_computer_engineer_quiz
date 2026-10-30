type CacheAnswerToggleProps = {
  isAnswerVisible: boolean;
  onToggle: () => void;
};

export default function CacheAnswerToggle({ isAnswerVisible, onToggle }: CacheAnswerToggleProps) {
  const label = isAnswerVisible ? "Hide answer" : "Show answer";
  const symbol = isAnswerVisible ? "−" : "＋";

  return (
    <button className="show-cache-answer" type="button" onClick={onToggle}>
      {label}
      <span>{symbol}</span>
    </button>
  );
}
