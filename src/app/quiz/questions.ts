export type QuizQuestion = {
  topic: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    topic: "FIFO · Cache policies",
    prompt: "A cache has 2 frames. Pages 1 then 2 entered in that order. With FIFO, what is evicted when page 3 arrives?",
    choices: ["Page 1", "Page 2", "Neither page"],
    answerIndex: 0,
    explanation: "FIFO evicts the page that entered the cache first, which is page 1.",
  },
  {
    topic: "LRU · Cache policies",
    prompt: "With 2 frames, the references are 1, 2, 1, 3. Which page does LRU evict for page 3?",
    choices: ["Page 1", "Page 2", "Neither page"],
    answerIndex: 1,
    explanation: "Page 1 was just used. Page 2 is the least recently used, so LRU evicts it.",
  },
  {
    topic: "MIN · Cache policies",
    prompt: "A 2-frame cache holds pages 1 and 2. Future references are 3, 2, 1. Which page does MIN evict for page 3?",
    choices: ["Page 1", "Page 2", "Either page"],
    answerIndex: 0,
    explanation: "Page 2 is needed sooner. Page 1 is needed farther in the future, so MIN evicts page 1.",
  },
  {
    topic: "LFU · Cache policies",
    prompt: "Two pages have the same frequency. LFU uses LRU to break ties. Which page is evicted?",
    choices: ["The page used less recently", "The page loaded first", "The page used most recently"],
    answerIndex: 0,
    explanation: "When frequencies tie, this app's LFU policy evicts the least recently used page.",
  },
  {
    topic: "SUM · Bit operations",
    prompt: "What is 13 + 5?",
    choices: ["18", "17", "8"],
    answerIndex: 0,
    explanation: "13 plus 5 equals 18.",
  },
  {
    topic: "SUBTRACT · Bit operations",
    prompt: "What is 13 − 5?",
    choices: ["7", "8", "9"],
    answerIndex: 1,
    explanation: "13 minus 5 equals 8.",
  },
  {
    topic: "SHL · Bit operations",
    prompt: "What is 7 shifted left by one bit?",
    choices: ["14", "3", "8"],
    answerIndex: 0,
    explanation: "A left shift by one multiplies a positive value by 2: 7 × 2 = 14.",
  },
  {
    topic: "SHR · Bit operations",
    prompt: "What is 36 shifted right by one bit?",
    choices: ["72", "18", "35"],
    answerIndex: 1,
    explanation: "A right shift by one divides a positive integer by 2 and drops the remainder: 36 ÷ 2 = 18.",
  },
  {
    topic: "Binary · Number conversion",
    prompt: "What is decimal 13 in 8-bit binary?",
    choices: ["00001101", "00001011", "00001110"],
    answerIndex: 0,
    explanation: "13 is 8 + 4 + 1, so its 8-bit binary form is 00001101.",
  },
  {
    topic: "Hexadecimal · Number conversion",
    prompt: "What decimal value does hexadecimal FF represent?",
    choices: ["255", "256", "240"],
    answerIndex: 0,
    explanation: "Each F is 15, so FF is 15 × 16 + 15 = 255.",
  },
];
