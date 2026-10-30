"use client";

import { useEffect, useState } from "react";

const CORRECT_COUNT_STORAGE_KEY = "bytewise-quiz-correct-count";

export default function useQuizProgress(questionCount: number) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);
  const [totalCorrectCount, setTotalCorrectCount] = useState(0);
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);

  useEffect(() => {
    try {
      const savedCount = window.localStorage.getItem(CORRECT_COUNT_STORAGE_KEY);
      const parsedCount = Number(savedCount);

      if (savedCount !== null && Number.isSafeInteger(parsedCount) && parsedCount >= 0) {
        setTotalCorrectCount(parsedCount);
      }
    } catch {
      // Start with the in-memory count when browser storage is unavailable.
    } finally {
      setHasLoadedProgress(true);
    }
  }, []);

  useEffect(() => {
    if (hasLoadedProgress) {
      try {
        window.localStorage.setItem(CORRECT_COUNT_STORAGE_KEY, String(totalCorrectCount));
      } catch {
        // Keep the quiz usable even if browser storage is unavailable.
      }
    }
  }, [hasLoadedProgress, totalCorrectCount]);

  const handleAnswerSelect = (selectedIndex: number, correctIndex: number) => {
    if (selectedAnswerIndex !== null) return;

    setSelectedAnswerIndex(selectedIndex);
    if (selectedIndex === correctIndex) {
      setTotalCorrectCount((count) => count + 1);
      setSessionCorrectCount((count) => count + 1);
    }
  };

  const handleNextQuestion = () => {
    const isLastQuestion = questionIndex === questionCount - 1;
    setQuestionIndex((index) => (isLastQuestion ? 0 : index + 1));
    setSelectedAnswerIndex(null);

    if (isLastQuestion) {
      setSessionCorrectCount(0);
    }
  };

  return {
    questionIndex,
    selectedAnswerIndex,
    sessionCorrectCount,
    totalCorrectCount,
    hasLoadedProgress,
    handleAnswerSelect,
    handleNextQuestion,
  };
}
