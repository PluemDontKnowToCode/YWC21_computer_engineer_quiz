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
    prompt: "A 2-frame cache holds page 1 and then page 2. Page 3 misses. Which page does FIFO evict?",
    choices: ["Page 1", "Page 2", "Neither page"],
    answerIndex: 0,
    explanation: "Page 1 entered before page 2, so it is the oldest resident page. FIFO follows arrival order; page 3 is loaded into page 1's frame.",
  },
  {
    topic: "LRU · Cache policies",
    prompt: "A 2-frame cache has seen references 1, 2, 1. Page 3 now misses. Which page does LRU evict?",
    choices: ["Page 1", "Page 2", "Neither page"],
    answerIndex: 1,
    explanation: "The last use of page 1 is more recent than page 2's. Page 2 has been unused longer, so LRU replaces page 2.",
  },
  {
    topic: "MIN · Cache policies",
    prompt: "A 2-frame cache holds pages 1 and 2. Page 3 misses now; the remaining references are 2, then 1. Which page does MIN evict?",
    choices: ["Page 1", "Page 2", "Either page"],
    answerIndex: 0,
    explanation: "Page 2 is needed at the next reference, while page 1 is needed one step later. MIN evicts the page needed farthest in the future: page 1.",
  },
  {
    topic: "LFU · Cache policies",
    prompt: "Page 4 and page 7 each have 3 references. Page 4 was used less recently. Under this lesson's LFU rule, which page is evicted?",
    choices: ["Page 4", "Page 7", "The page loaded first, regardless of use"],
    answerIndex: 0,
    explanation: "The reference counts tie, so this lesson uses LRU as a tie-breaker. Page 4 was used less recently, so it is evicted.",
  },
  {
    topic: "SUM · Bit operations",
    prompt: "What is 00001101 + 00000101 in binary?",
    choices: ["00010010", "00010000", "00001110"],
    answerIndex: 0,
    explanation: "Add from right to left: 1 + 1 gives 0 and carries 1. The full sum is 00010010, which is decimal 18.",
  },
  {
    topic: "SUBTRACT · Bit operations",
    prompt: "What is 13 − 5?",
    choices: ["7", "8", "9"],
    answerIndex: 1,
    explanation: "13 − 5 = 8. In binary, 00001101 − 00000101 = 00001000; the 8 remains in the 2³ place.",
  },
  {
    topic: "SHL · Bit operations",
    prompt: "What is 7 shifted left by one bit?",
    choices: ["14", "3", "8"],
    answerIndex: 0,
    explanation: "Move every bit left and put 0 on the right: 00000111 becomes 00001110. Its value doubles from 7 to 14.",
  },
  {
    topic: "SHR · Bit operations",
    prompt: "What is 37 shifted right by one bit as an unsigned value?",
    choices: ["18", "19", "74"],
    answerIndex: 0,
    explanation: "Move each bit right and discard the rightmost bit: 00100101 becomes 00010010. The dropped 1 is the remainder, so 37 >> 1 is floor(37 ÷ 2) = 18.",
  },
  {
    topic: "Binary · Number conversion",
    prompt: "What is decimal 13 in 8-bit binary?",
    choices: ["00001101", "00001011", "00001110"],
    answerIndex: 0,
    explanation: "The set bits mark 8, 4, and 1. Their sum is 13, so the 8-bit form is 00001101; leading zeros preserve the width without changing the value.",
  },
  {
    topic: "Hexadecimal · Number conversion",
    prompt: "What decimal value does hexadecimal FF represent?",
    choices: ["255", "256", "240"],
    answerIndex: 0,
    explanation: "Hexadecimal is base 16: the first F is in the 16s place and the second F is in the 1s place. FF = 15 × 16 + 15 = 255.",
  },
];
