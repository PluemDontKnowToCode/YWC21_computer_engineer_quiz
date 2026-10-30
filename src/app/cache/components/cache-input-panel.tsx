import CacheAnswerToggle from "./cache-answer-toggle";

type CacheInputPanelProps = {
  referenceInput: string;
  frameCount: number;
  isAnswerVisible: boolean;
  onReferenceChange: (value: string) => void;
  onFrameCountChange: (value: string) => void;
  onNewChallenge: () => void;
  onToggleAnswer: () => void;
};

export default function CacheInputPanel({
  referenceInput,
  frameCount,
  isAnswerVisible,
  onReferenceChange,
  onFrameCountChange,
  onNewChallenge,
  onToggleAnswer,
}: CacheInputPanelProps) {
  return (
    <div className="cache-input-panel">
      <label className="cache-input-label">
        REFERENCE STRING <span>Enter page numbers separated by spaces or commas</span>
        <input
          aria-label="Reference string"
          value={referenceInput}
          onChange={(event) => onReferenceChange(event.target.value)}
        />
      </label>

      <label className="cache-input-label frame-input-label">
        FRAMES
        <input
          aria-label="Number of cache frames"
          type="number"
          min="1"
          max="6"
          value={frameCount}
          onChange={(event) => onFrameCountChange(event.target.value)}
        />
      </label>

      <button className="randomize-button" type="button" onClick={onNewChallenge}>
        New Challenge
      </button>
      <CacheAnswerToggle isAnswerVisible={isAnswerVisible} onToggle={onToggleAnswer} />
    </div>
  );
}
