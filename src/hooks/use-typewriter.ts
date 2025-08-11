
"use client";

import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStart(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  useEffect(() => {
    if (!start) return;

    setDisplayedText(''); // Reset on text change
    setIsTyping(true);

    if (text.length === 0) {
        setIsTyping(false);
        return;
    }

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, speed);
    
    return () => {
        clearInterval(typingInterval);
    };

  }, [text, speed, start]);

  return { displayedText, isTyping };
}
