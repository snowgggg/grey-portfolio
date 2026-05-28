"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type RevealDirection = "start" | "end" | "center";
type AnimateOn = "view" | "hover" | "inViewHover" | "click";
type ClickMode = "once" | "toggle";

type DecryptedTextProps = Omit<HTMLMotionProps<"span">, "children"> & {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: RevealDirection;
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: AnimateOn;
  clickMode?: ClickMode;
  active?: boolean;
};

const styles: Record<"wrapper" | "srOnly", CSSProperties> = {
  wrapper: {
    display: "inline-block",
    whiteSpace: "pre-wrap",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
};

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  clickMode = "once",
  active,
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set()
  );
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== "click");
  const [direction, setDirection] = useState<"forward" | "reverse">("forward");

  const containerRef = useRef<HTMLSpanElement | null>(null);
  const orderRef = useRef<number[]>([]);
  const pointerRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const previousActiveRef = useRef<boolean | undefined>(undefined);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");
  }, [characters, text, useOriginalCharsOnly]);

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) => {
      return originalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (currentRevealed.has(index)) return originalText[index];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");
    },
    [availableChars]
  );

  const computeOrder = useCallback(
    (length: number) => {
      const order: number[] = [];
      if (length <= 0) return order;
      if (revealDirection === "start") {
        for (let index = 0; index < length; index += 1) order.push(index);
        return order;
      }
      if (revealDirection === "end") {
        for (let index = length - 1; index >= 0; index -= 1) order.push(index);
        return order;
      }

      const middle = Math.floor(length / 2);
      let offset = 0;
      while (order.length < length) {
        if (offset % 2 === 0) {
          const index = middle + offset / 2;
          if (index >= 0 && index < length) order.push(index);
        } else {
          const index = middle - Math.ceil(offset / 2);
          if (index >= 0 && index < length) order.push(index);
        }
        offset += 1;
      }
      return order.slice(0, length);
    },
    [revealDirection]
  );

  const fillAllIndices = useCallback(() => {
    const indices = new Set<number>();
    for (let index = 0; index < text.length; index += 1) indices.add(index);
    return indices;
  }, [text]);

  const removeRandomIndices = useCallback((set: Set<number>, count: number) => {
    const indices = Array.from(set);
    for (let index = 0; index < count && indices.length > 0; index += 1) {
      const randomIndex = Math.floor(Math.random() * indices.length);
      indices.splice(randomIndex, 1);
    }
    return new Set(indices);
  }, []);

  const encryptInstantly = useCallback(() => {
    const emptySet = new Set<number>();
    setRevealedIndices(emptySet);
    setDisplayText(shuffleText(text, emptySet));
    setIsDecrypted(false);
  }, [shuffleText, text]);

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length);
      pointerRef.current = 0;
    }
    setRevealedIndices(new Set());
    setDirection("forward");
    setIsAnimating(true);
  }, [computeOrder, sequential, text.length]);

  const triggerReverse = useCallback(() => {
    const allIndices = fillAllIndices();
    if (sequential) {
      orderRef.current = computeOrder(text.length).slice().reverse();
      pointerRef.current = 0;
    }
    setRevealedIndices(allIndices);
    setDisplayText(shuffleText(text, allIndices));
    setDirection("reverse");
    setIsAnimating(true);
  }, [computeOrder, fillAllIndices, sequential, shuffleText, text]);

  useEffect(() => {
    if (!isAnimating) return;

    let currentIteration = 0;

    const getNextIndex = (revealedSet: Set<number>) => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex =
            revealedSet.size % 2 === 0
              ? middle + offset
              : middle - offset - 1;

          if (
            nextIndex >= 0 &&
            nextIndex < textLength &&
            !revealedSet.has(nextIndex)
          ) {
            return nextIndex;
          }

          for (let index = 0; index < textLength; index += 1) {
            if (!revealedSet.has(index)) return index;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices((previousRevealed) => {
        if (sequential) {
          if (direction === "forward") {
            if (previousRevealed.size < text.length) {
              const nextIndex = getNextIndex(previousRevealed);
              const newRevealed = new Set(previousRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, newRevealed));
              return newRevealed;
            }
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsAnimating(false);
            setIsDecrypted(true);
            return previousRevealed;
          }

          if (pointerRef.current < orderRef.current.length) {
            const indexToRemove = orderRef.current[pointerRef.current];
            pointerRef.current += 1;
            const newRevealed = new Set(previousRevealed);
            newRevealed.delete(indexToRemove);
            setDisplayText(shuffleText(text, newRevealed));
            if (newRevealed.size === 0) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(false);
            }
            return newRevealed;
          }

          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsAnimating(false);
          setIsDecrypted(false);
          return previousRevealed;
        }

        if (direction === "forward") {
          setDisplayText(shuffleText(text, previousRevealed));
          currentIteration += 1;
          if (currentIteration >= maxIterations) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsAnimating(false);
            setDisplayText(text);
            setIsDecrypted(true);
          }
          return previousRevealed;
        }

        let currentSet = previousRevealed;
        if (currentSet.size === 0) currentSet = fillAllIndices();
        const removeCount = Math.max(
          1,
          Math.ceil(text.length / Math.max(1, maxIterations))
        );
        const nextSet = removeRandomIndices(currentSet, removeCount);
        setDisplayText(shuffleText(text, nextSet));
        currentIteration += 1;
        if (nextSet.size === 0 || currentIteration >= maxIterations) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsAnimating(false);
          setIsDecrypted(false);
          setDisplayText(shuffleText(text, new Set()));
          return new Set<number>();
        }
        return nextSet;
      });
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [
    characters,
    direction,
    fillAllIndices,
    isAnimating,
    maxIterations,
    removeRandomIndices,
    revealDirection,
    sequential,
    shuffleText,
    speed,
    text,
    useOriginalCharsOnly,
  ]);

  const handleClick = () => {
    if (animateOn !== "click") return;

    if (clickMode === "once") {
      if (isDecrypted) return;
      setDirection("forward");
      triggerDecrypt();
    }

    if (clickMode === "toggle") {
      if (isDecrypted) {
        triggerReverse();
      } else {
        setDirection("forward");
        triggerDecrypt();
      }
    }
  };

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return;

    setRevealedIndices(new Set());
    setIsDecrypted(false);
    setDisplayText(text);
    setDirection("forward");
    setIsAnimating(true);
  }, [isAnimating, text]);

  const resetToPlainText = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
    setIsDecrypted(true);
    setDirection("forward");
  }, [text]);

  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "inViewHover") return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          triggerDecrypt();
          setHasAnimated(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });
    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => {
    if (animateOn === "click") {
      encryptInstantly();
    } else {
      setDisplayText(text);
      setIsDecrypted(true);
    }
    setRevealedIndices(new Set());
    setDirection("forward");
  }, [animateOn, encryptInstantly, text]);

  useEffect(() => {
    if (active === undefined) return;
    if (previousActiveRef.current === active) return;

    previousActiveRef.current = active;

    if (active) {
      triggerHoverDecrypt();
    } else {
      resetToPlainText();
    }
  }, [active, resetToPlainText, triggerHoverDecrypt]);

  const animateProps =
    animateOn === "hover" || animateOn === "inViewHover"
      ? {
          onMouseEnter: triggerHoverDecrypt,
          onMouseLeave: resetToPlainText,
        }
      : animateOn === "click"
        ? {
            onClick: handleClick,
          }
        : {};

  return (
    <motion.span
      className={parentClassName}
      ref={containerRef}
      style={styles.wrapper}
      {...animateProps}
      {...props}
    >
      <span style={styles.srOnly}>{displayText}</span>

      <span className="decrypt-measure" aria-hidden="true">
        {text}
      </span>

      <span className="decrypt-output" aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealedOrDone =
            revealedIndices.has(index) || (!isAnimating && isDecrypted);
          const characterClassName = [
            isRevealedOrDone ? className : encryptedClassName,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <span
              className={characterClassName}
              key={`${char}-${index}`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
