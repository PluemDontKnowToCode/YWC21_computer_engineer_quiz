type CacheAnswerCellProps = {
  value: string | undefined;
};

export default function CacheAnswerCell({ value }: CacheAnswerCellProps) {
  return <span className="answer-cell">{value ?? ""}</span>;
}
