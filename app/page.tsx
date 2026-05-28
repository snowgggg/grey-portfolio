"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import DecryptedText from "@/components/DecryptedText";
import MusicPlayer from "@/components/MusicPlayer";
import TextType from "@/components/TextType";

const navItems = [
  ["Work", "#work"],
  ["About", "/about"],
];
const loaderWords = [
  "Hello",
  "Bonjour",
  "स्वागत हे",
  "Ciao",
  "Olá",
  "おい",
  "Hallå",
  "Guten tag",
  "Hallo",
];

const featuredWork = [
  {
    title: "Gate PayWebsite",
    image: "/assets/recent-work/Frame 2147234428.png",
    href: "/gate-pay",
  },
  {
    title: "Gate PayWebsite",
    image: "/assets/recent-work/Frame 2147234429.png",
    href: "/gate-pay-dashboard",
  },
  {
    title: "Font Design",
    image: "/assets/recent-work/Frame 2147234430.png",
    href: "/font-design",
  },
];


const footerAssets = {
  phone: "/assets/illustration/wechat.svg",
  email: "/assets/illustration/Frame.svg",
};

const recentWork = [
  { title: "Gate Pay Website", image: "/assets/recent-work/gatepay image 1.png", href: "/gate-pay" },
  { title: "Dashboard", image: "/assets/recent-work/gatepay image 2.png", href: "/gate-pay-dashboard" },
  { title: "Gift Card", image: "/assets/recent-work/gatepay image 3.png", href: "/gate-pay-gift-card" },
  { title: "Product Video", image: "/assets/recent-work/gatepay image 4.png", href: "/gate-pay-video" },
  { title: "Font Design", image: "/assets/recent-work/gatepay image 5.png", href: "/font-design" },
  { title: "Icon", image: "/assets/recent-work/gatepay image 10.png", href: "/icon-upgrade" },
  { title: "Color", image: "/assets/recent-work/gatepay image 6.png", href: "/color-upgrade" },
  { title: "AI Tools", image: "/assets/recent-work/gatepay image 7.png", href: "/ai-tool" },
  { title: "Daily Needs", image: "/assets/recent-work/gatepay image 8.png", href: "/daily-needs" },
  { title: "Illustration", image: "/assets/recent-work/gatepay image 9.png", href: "/illustration" },
];

export default function Home() {
  const [loaderIndex, setLoaderIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [statementReady, setStatementReady] = useState(false);
  const [activeWork, setActiveWork] = useState<number | null>(null);
  const [preserveHashScroll, setPreserveHashScroll] = useState(false);

  useEffect(() => {
    const cameFromPageTransition =
      window.sessionStorage.getItem("grey-page-transition") === "1";

    if (cameFromPageTransition) {
      setPreserveHashScroll(Boolean(window.location.hash));
      window.sessionStorage.removeItem("grey-page-transition");
      setShowLoader(false);
      setStatementReady(true);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.requestAnimationFrame(() => {
        const target = window.location.hash
          ? document.querySelector(window.location.hash)
          : null;
        target?.scrollIntoView({ block: "start" });
      });
      return;
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const wordTimer = window.setInterval(() => {
      setLoaderIndex((index) => (index + 1) % loaderWords.length);
    }, 180);
    const exitTimer = window.setTimeout(() => {
      setShowLoader(false);
    }, 1850);

    return () => {
      window.clearInterval(wordTimer);
      window.clearTimeout(exitTimer);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!showLoader) {
      window.requestAnimationFrame(() => {
        const target = preserveHashScroll && window.location.hash
          ? document.querySelector(window.location.hash)
          : null;

        if (target) {
          target.scrollIntoView({ block: "start" });
        } else {
          window.scrollTo(0, 0);
        }
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      });
    }
  }, [preserveHashScroll, showLoader]);

  return (
    <main className="min-h-screen overflow-hidden bg-void text-bone">
      <div className="cinematic-noise" />

      <AnimatePresence
        onExitComplete={() => {
          window.scrollTo(0, 0);
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          setStatementReady(true);
        }}
      >
        {showLoader ? (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-void text-bone"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="h-[clamp(64px,13vw,210px)] overflow-hidden text-center">
              <motion.p
                className="font-display text-[clamp(60px,13vw,210px)] leading-none tracking-[-0.045em] text-white"
                key={loaderWords[loaderIndex]}
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                {loaderWords[loaderIndex]}
              </motion.p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section
        id="top"
        className="relative isolate min-h-svh overflow-hidden px-[clamp(18px,3vw,44px)]"
        aria-label="Grey portfolio introduction"
      >
        <motion.video
          className="absolute inset-0 -z-20 h-full w-full object-cover contrast-110 saturate-90"
          src="/assets/hero/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.85, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,5,5,0.72)_0%,rgba(5,5,5,0.08)_34%,rgba(5,5,5,0.42)_100%)]" />

        <motion.header
          className="relative grid h-20 grid-cols-[1fr_auto_auto] items-center gap-x-[clamp(18px,3vw,46px)] text-bone/[0.82] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-bone/[0.12] after:content-[''] max-md:h-16"
          aria-label="Primary navigation"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            className="link-underline loco-nav-link brand-link w-max"
            href="/"
            aria-label="Grey home"
            data-no-transition="true"
            data-transition="none"
          >
            <DecryptedText
              text="@GREY DESIGN PORTFOLIO"
              speed={34}
              maxIterations={12}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/#$%&"
              className="text-bone/[0.82]"
              encryptedClassName="text-mint"
              parentClassName="decrypt-brand"
              animateOn="hover"
            />
          </a>
          <nav className="flex items-center justify-end gap-[clamp(18px,3vw,46px)]">
              {navItems.map(([item, href]) => (
                <a
                  className="link-underline loco-nav-link"
                  href={href}
                  key={item}
                >
                  {item}
                </a>
              ))}
            </nav>
            <MusicPlayer />
        </motion.header>

        <motion.p
          className="absolute bottom-[clamp(24px,3vw,48px)] left-[clamp(18px,3vw,44px)] whitespace-nowrap font-clash text-[clamp(34px,3.34vw,64px)] font-medium leading-[1.02] text-white max-md:whitespace-normal"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">Where design meets emotion, rhythm,</span>
          <span className="block">and technology.</span>
        </motion.p>
      </section>

      <section
        className="grid min-h-[calc(100svh-200px)] place-items-center bg-black px-[clamp(18px,3vw,44px)]"
        aria-label="Design statement"
        data-node-id="112:475"
      >
        {statementReady ? (
          <TextType
            key="home-design-statement"
            as="div"
            className="w-full max-w-[1460px] text-center font-clash text-[clamp(32px,4.45vw,64px)] font-normal leading-[1.5] text-white"
            cursorCharacter="|"
            initialDelay={180}
            loop={false}
            pauseDuration={1600}
            showCursor
            text={
              "Design is the balance between clarity, emotion, and technology.\nI create experiences that feel minimal, intentional, and timeless."
            }
            typingSpeed={24}
            variableSpeed={{ min: 16, max: 42 }}
          />
        ) : null}
      </section>

      <section
        className="bg-black px-[clamp(18px,6.25vw,120px)] pb-[clamp(120px,12.5vw,240px)] pt-[100px]"
        id="work"
        aria-label="Recent work"
        data-node-id="112:486"
      >
        <div className="mx-auto flex w-full max-w-[1680px] flex-col items-start gap-12">
          <p className="font-sans text-2xl font-normal uppercase leading-[1.5] text-[#9e9e9e] max-md:text-base">
            Recent Work
          </p>

          <div className="grid w-full grid-cols-3 gap-10 max-lg:grid-cols-1">
            {featuredWork.map((item, index) => (
              <motion.a
                className="group relative overflow-hidden bg-[#797979]"
                href={item.href}
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img
                  alt={item.title}
                  className="block aspect-[1067/1200] h-auto w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                  src={item.image}
                />
              </motion.a>
            ))}
          </div>

          <div className="flex w-full flex-col items-start gap-12 pt-[clamp(48px,5vw,80px)]">
            <div className="flex w-full flex-col items-center gap-10">
              {recentWork.map((item, index) => {
                const words = item.title.split(" ");
                const insertAfter = words.length === 1 ? 0 : 0;

                return (
                  <motion.a
                    className="group relative flex w-full flex-col items-center gap-10 overflow-visible"
                    href={item.href ?? "#work"}
                    key={item.title}
                    onMouseEnter={() => setActiveWork(index)}
                    onMouseLeave={() => setActiveWork(null)}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="relative z-10 flex w-full flex-wrap items-center justify-center gap-x-[0.25em] gap-y-4 text-center font-clash text-[clamp(48px,6.25vw,120px)] font-normal capitalize leading-[1.5] text-white transition duration-500 group-hover:-translate-y-2">
                      {words.map((word, wordIndex) => (
                        <span className="contents" key={`${item.title}-${word}`}>
                          <DecryptedText
                            active={activeWork === index}
                            animateOn="hover"
                            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
                            className="text-white"
                            encryptedClassName="text-white/45"
                            maxIterations={9}
                            parentClassName="recent-decrypt-word"
                            speed={28}
                            text={word}
                          />
                          {wordIndex === insertAfter ? (
                            <span className="relative mx-0 inline-block h-0 w-0 shrink-0 overflow-hidden align-middle opacity-0 transition-all duration-500 ease-out group-hover:mx-4 group-hover:h-[120px] group-hover:w-[190px] group-hover:opacity-100">
                              <img
                                alt=""
                                className="h-[120px] w-[190px] object-cover transition duration-700 ease-out group-hover:scale-105"
                                src={item.image}
                              />
                            </span>
                          ) : null}
                        </span>
                      ))}
                    </span>
                    <span className="h-px w-full bg-white/35 transition duration-500 group-hover:bg-white/80" />
                  </motion.a>
                );
              })}
              </div>
            </div>
        </div>
      </section>

      <motion.footer
        id="about"
        className="bg-black"
        data-node-id="120:325"
        aria-label="Contact footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex h-[clamp(320px,21.875vw,420px)] flex-col items-center bg-[#eafd27] px-[clamp(18px,6.25vw,120px)] pt-[clamp(82px,6.15vw,118px)] text-black">
          <motion.h2
            className="w-full max-w-[997px] text-center font-clash text-[clamp(52px,5.21vw,100px)] font-normal capitalize leading-[1.5] tracking-normal"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Let’s wrok </span>
            <span className="font-semibold">Together</span>
          </motion.h2>

          <motion.div
            className="mt-5 flex items-center justify-center gap-16 font-clash text-2xl font-normal leading-[1.5] text-black max-md:flex-col max-md:gap-3 max-md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="flex items-center gap-4 whitespace-nowrap" href="tel:13418544479">
              <img alt="" className="h-10 w-10 object-contain" src={footerAssets.phone} />
              <span>134-1854-4479</span>
            </a>
            <a className="flex items-center gap-4 whitespace-nowrap" href="mailto:Grey340611@gmail.com">
              <img alt="" className="h-10 w-10 object-contain" src={footerAssets.email} />
              <span>Grey340611@gmail.com</span>
            </a>
          </motion.div>
        </div>

      </motion.footer>

    </main>
  );
}
