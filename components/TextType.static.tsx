"use client";

import {
  createElement,
  useEffect,
  useMemo,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "gsap";

type TextTypeProps = {
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: ReactNode;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
};

const TextType = ({
  text,
  as: Component = "div",
  className = "",
  showCursor = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  reverseMode = false,
  ...props
}: TextTypeProps) => {
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  const visibleText = useMemo(() => {
    const source = Array.isArray(text) ? text : [text];
    const firstText = source.find((item) => typeof item === "string" && item.trim()) ?? "";
    return reverseMode ? firstText.split("").reverse().join("") : firstText;
  }, [text, reverseMode]);

  const textColor = textColors.length > 0 ? textColors[0] : "inherit";

  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;

    gsap.set(cursorRef.current, { opacity: 1 });
    const tween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      tween.kill();
    };
  }, [showCursor, cursorBlinkDuration]);

  return createElement(
    Component,
    {
      className: `text-type ${className}`,
      ...props,
    },
    <span className="text-type__content" style={{ color: textColor }}>
      {visibleText}
    </span>,
    showCursor && (
      <span ref={cursorRef} className={`text-type__cursor ${cursorClassName}`}>
        {cursorCharacter}
      </span>
    ),
  );
};

export default TextType;
