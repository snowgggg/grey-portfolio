"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import PixelTransition from "../../components/PixelTransition";

const decodeCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/#$%&";

const titleText = "A UX Designer Crafting Thoughtful Digital Experiences.";
const bodyText =
  "UX designer with experience across Web3, fintech, and digital product ecosystems — focused on building scalable systems, intuitive interactions, and globally accessible experiences through strategic design and modern visual thinking.";

const contactItems = [
  {
    label: "134-1854-4479",
    icon: <WeChatIcon />,
    weight: "font-medium",
  },
  {
    label: "Grey340611@gmail.com",
    icon: <MailIcon />,
    weight: "font-normal",
  },
];

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function decodeText(text: string, progress: number, tick: number) {
  const revealCount = Math.floor(text.length * progress);

  return text
    .split("")
    .map((character, index) => {
      if (character === " " || character === "\n") return character;
      if (index < revealCount) return character;

      return decodeCharacters[
        (index * 17 + tick * 7) % decodeCharacters.length
      ];
    })
    .join("");
}

function WeChatIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className="h-10 w-10 shrink-0 fill-white"
    >
      <path d="M15.9 12.1c-6.3 0-11.4 4.1-11.4 9.1 0 2.9 1.7 5.4 4.4 7.1l-1 3.5 4-2a14.3 14.3 0 0 0 4 .6h.7a8.2 8.2 0 0 1-.4-2.6c0-5.1 4.8-9.2 10.7-9.2h.3c-1.3-3.8-5.8-6.5-11.3-6.5Zm-4.1 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm8.2 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
      <path d="M35.5 27.7c0-4.1-4.1-7.5-9.1-7.5s-9.1 3.4-9.1 7.5 4.1 7.5 9.1 7.5c1 0 2-.1 2.9-.4l3.2 1.6-.8-2.8c2.3-1.4 3.8-3.5 3.8-5.9Zm-12-2.5a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className="h-10 w-10 shrink-0 fill-white"
    >
      <path d="M7.4 12h25.2c.8 0 1.4.6 1.4 1.4v.6L20 22.3 6 14v-.6c0-.8.6-1.4 1.4-1.4Z" />
      <path d="M6 17.2v9.4c0 .8.6 1.4 1.4 1.4h25.2c.8 0 1.4-.6 1.4-1.4v-9.4l-13.4 7.9a1.2 1.2 0 0 1-1.2 0L6 17.2Z" />
    </svg>
  );
}

function ContactItem({
  icon,
  label,
  weight,
  progress,
  tick,
}: {
  icon: ReactNode;
  label: string;
  weight: string;
  progress: number;
  tick: number;
}) {
  const decodedLabel = useMemo(
    () => decodeText(label, progress, tick),
    [label, progress, tick],
  );

  return (
    <a
      href={label.includes("@") ? `mailto:${label}` : undefined}
      className="flex shrink-0 items-center gap-4 text-white"
      style={{ opacity: 0.22 + progress * 0.78 }}
    >
      {icon}
      <span
        aria-label={label}
        className={`font-clash text-[24px] leading-[1.5] ${weight} whitespace-nowrap capitalize`}
      >
        {decodedLabel}
      </span>
    </a>
  );
}

export default function AboutScrollDecode() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const target = contentRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const nextProgress = clamp(
        (viewportHeight * 0.78 - rect.top) / (viewportHeight * 0.58),
      );

      setProgress(nextProgress);
      setTick((value) => value + 1);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const heroProgress = clamp((progress - 0.28) / 0.72);
  const contentProgress = clamp((progress - 0.06) / 0.94);
  const titleProgress = clamp((progress - 0.08) / 0.78);
  const bodyProgress = clamp((progress - 0.22) / 0.72);
  const contactProgress = clamp((progress - 0.38) / 0.62);

  const heroStyle = {
    opacity: 1 - heroProgress * 0.86,
    filter: `blur(${heroProgress * 10}px) contrast(${
      1 + heroProgress * 1.35
    }) brightness(${1 + heroProgress * 0.35}) saturate(${
      1 - heroProgress * 0.75
    })`,
    transform: `translateY(${-heroProgress * 48}px) scale(${
      1 - heroProgress * 0.018
    })`,
  } as CSSProperties;

  return (
    <div className="flex items-center px-5 pb-20 pt-20 md:px-12 md:pb-28 md:pt-20 2xl:px-[120px] 2xl:pb-[160px] 2xl:pt-20">
      <section
        className="mx-auto flex w-full max-w-[1680px] flex-col items-center gap-16 md:gap-24 2xl:gap-[120px]"
      >
        <div
          className="relative h-auto w-full overflow-hidden rounded-2xl bg-white transition-[opacity,filter,transform] duration-200 ease-out 2xl:h-[680px]"
          style={heroStyle}
        >
          <PixelTransition
            firstContent={
              <img
                src="/assets/about/01.png"
                alt="Grey surrounded by visual references"
                className="block h-full w-full object-cover"
              />
            }
            secondContent={
              <img
                src="/assets/about/01.png"
                alt=""
                className="block h-full w-full scale-[1.018] object-cover brightness-[0.72] contrast-125 saturate-[0.35]"
              />
            }
            gridSize={12}
            pixelColor="#050505"
            animationStepDuration={0.42}
            aspectRatio="40.4761904762%"
            className="h-full w-full"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              opacity: heroProgress,
              backgroundImage:
                "linear-gradient(90deg, rgba(0,0,0,.18) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,.24) 1px, transparent 1px)",
              backgroundSize: `${Math.max(4, 18 - heroProgress * 12)}px ${Math.max(
                4,
                18 - heroProgress * 12,
              )}px`,
            }}
          />
        </div>

        <div
          ref={contentRef}
          className="flex w-full max-w-[1200px] flex-col items-center gap-16 md:gap-20 2xl:gap-[120px]"
          style={{
            opacity: 0.18 + contentProgress * 0.82,
            transform: `translateY(${(1 - contentProgress) * 34}px)`,
          }}
        >
          <div className="flex w-full flex-col items-start gap-8 text-center md:gap-10">
            <h1
              aria-label={titleText}
              className="w-full break-words font-clash text-[52px] font-semibold leading-[1.12] text-white md:text-[88px] 2xl:text-[120px] 2xl:leading-[140px]"
            >
              {decodeText(titleText, titleProgress, tick)}
            </h1>
            <p
              aria-label={bodyText}
              className="w-full font-sans text-[18px] font-light leading-[1.8] text-[#707070] md:text-[22px] 2xl:text-[24px]"
            >
              {decodeText(bodyText, bodyProgress, tick)}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-16">
            {contactItems.map((item) => (
              <ContactItem
                key={item.label}
                {...item}
                progress={contactProgress}
                tick={tick}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
