
"use client";

import { useState, useEffect } from 'react';

const phrases = [
  "Making Learning Easier",
  "Connecting Classrooms",
  "Empowering Educators",
  "Inspiring Students",
];

export function AnimatedHeader() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 text-center">
      <span
        key={currentPhraseIndex}
        className="text-sm font-medium text-muted-foreground animate-fade-in-out"
      >
        {phrases[currentPhraseIndex]}
      </span>
    </div>
  );
}
