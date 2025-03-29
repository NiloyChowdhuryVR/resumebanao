"use client";
import { useState, useEffect } from "react";

interface TypewriterEffectProps {
  text: string;
  speed?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <div className="whitespace-pre-wrap">{displayedText}</div>;
};

export default TypewriterEffect;
