type CacheAnswerCellProps = {
  value: number | undefined;
};

export default function CacheAnswerCell({ value }: CacheAnswerCellProps) {
  return <span className="answer-cell">{value ?? "–"}</span>;
}
