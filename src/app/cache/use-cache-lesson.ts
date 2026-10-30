"use client";

import { useState } from "react";
import {
  clampFrameCount,
  makeReference,
  parseReferences,
} from "../../service/cache/input";
import { simulate } from "../../service/cache/simulate";
import type { Policy } from "../../service/cache/types";

const DEFAULT_REFERENCE = "1 2 3 4 1 2 5 1 2 3 4 5";

export default function useCacheLesson(policy: Policy) {
  const [referenceInput, setReferenceInput] = useState(DEFAULT_REFERENCE);
  const [frameCount, setFrameCount] = useState(3);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [frameAnswers, setFrameAnswers] = useState<Record<string, string>>({});

  const references = parseReferences(referenceInput);
  const steps = simulate(policy, references, frameCount);

  const handleReferenceChange = (value: string) => {
    setReferenceInput(value);
    setIsAnswerVisible(false);
  };

  const handleFrameCountChange = (value: string) => {
    setFrameCount(clampFrameCount(value));
    setIsAnswerVisible(false);
  };

  const handleNewChallenge = () => {
    setReferenceInput((current) => makeReference(current));
    setIsAnswerVisible(false);
    setFrameAnswers({});
  };

  const handleFrameAnswer = (key: string, value: string) => {
    setFrameAnswers((current) => ({ ...current, [key]: value }));
  };

  const handleToggleAnswer = () => {
    setIsAnswerVisible((visible) => !visible);
  };

  return {
    referenceInput,
    frameCount,
    isAnswerVisible,
    frameAnswers,
    references,
    steps,
    handleReferenceChange,
    handleFrameCountChange,
    handleNewChallenge,
    handleFrameAnswer,
    handleToggleAnswer,
  };
}
