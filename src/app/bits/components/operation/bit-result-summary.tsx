type BitResultSummaryProps = {
  result: number;
  binaryResult: string;
  description: string;
};

export default function BitResultSummary({ result, binaryResult, description }: BitResultSummaryProps) {
  return (
    <div className="result-row" aria-live="polite">
      <div><span>RESULT</span><strong>{result}</strong></div>
      <div><span>IN BINARY</span><code>{binaryResult}</code></div>
      <div className="result-explain">{description}</div>
    </div>
  );
}
