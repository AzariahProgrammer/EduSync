
"use client";

import { useState, useEffect, useRef } from 'react';

export function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [start, setStart] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      setStart(true);
    }, delay);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [delay]);

  useEffect(() => {
    if (!start) return;
    
    // When text changes, reset the animation
    setDisplayedText('');
    setIsTyping(true);
    
    if (text.length === 0) {
      setIsTyping(false);
      return;
    }

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => text.slice(0, i + 1));
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
