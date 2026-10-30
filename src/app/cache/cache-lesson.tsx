"use client";

import type { Policy } from "../../service/cache/types";
import CacheInputPanel from "./components/cache-input-panel";
import CacheResults from "./components/cache-results";
import CacheTakeaway from "./components/cache-takeaway";
import useCacheLesson from "./use-cache-lesson";

export default function CacheLesson({ policy }: { policy: Policy }) {
  const cacheLesson = useCacheLesson(policy);

  return (
    <section className="lesson-section" id="cache">
      <div className="section-heading">
        <div className="section-number">01</div>
        <div>
          <div className="eyebrow">MEMORY MANAGEMENT</div>
          <h2>{policy} replacement policy</h2>
        </div>
      </div>

      <p className="section-copy">
        When the cache is full, this policy chooses which page to remove. Set the frame count and reference sequence, then enter the cache contents as each reference arrives.
      </p>

      <CacheInputPanel
        referenceInput={cacheLesson.referenceInput}
        frameCount={cacheLesson.frameCount}
        isAnswerVisible={cacheLesson.isAnswerVisible}
        onReferenceChange={cacheLesson.handleReferenceChange}
        onFrameCountChange={cacheLesson.handleFrameCountChange}
        onNewChallenge={cacheLesson.handleNewChallenge}
        onToggleAnswer={cacheLesson.handleToggleAnswer}
      />

      <p className="sequence-caption">
        {cacheLesson.references.length} references · {cacheLesson.frameCount} cache frames · each new challenge shuffles the reference string
      </p>

      <div className="cache-policy-panel">
        <CacheResults
          references={cacheLesson.references}
          frameCount={cacheLesson.frameCount}
          policy={policy}
          steps={cacheLesson.steps}
          isAnswerVisible={cacheLesson.isAnswerVisible}
          frameAnswers={cacheLesson.frameAnswers}
          onFrameAnswer={cacheLesson.handleFrameAnswer}
        />
      </div>

      <CacheTakeaway />
    </section>
  );
}
