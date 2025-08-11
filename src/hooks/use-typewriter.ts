
"use client";

import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText(''); // Reset on text change
    setIsTyping(true);
    let timeoutId: NodeJS.Timeout;
    
    const startTyping = () => {
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
    };

    if (delay > 0) {
        timeoutId = setTimeout(startTyping, delay);
    } else {
        startTyping();
    }
    
    return () => {
        clearTimeout(timeoutId);
        // No need to clear interval here as it's managed inside startTyping
    };

  }, [text, speed, delay]);

  const blinkingCursor = <span className="blinking-cursor" />;

  return isTyping ? <>{displayedText}{blinkingCursor}</> : <>{text}</>;
}
