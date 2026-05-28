"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Lenis?: new (options: Record<string, unknown>) => {
      destroy: () => void;
      raf: (time: number) => void;
      scrollTo: (target: number | string | HTMLElement, options?: Record<string, unknown>) => void;
      on?: (event: string, callback: () => void) => void;
    };
    greySmoothScroll?: {
      destroy: () => void;
      scrollTo: (target: number | string | HTMLElement) => void;
    };
  }
}

const lenisScriptSrc = "https://unpkg.com/lenis/dist/lenis.min.js";

function prefersAnchorNavigation(link: HTMLAnchorElement) {
  const href = link.getAttribute("href") || "";
  return href.startsWith("#") || href.includes("#");
}

function loadLenisScript() {
  if (window.Lenis) return Promise.resolve(true);

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${lenisScriptSrc}"]`,
  );

  if (existingScript) {
    return new Promise<boolean>((resolve) => {
      existingScript.addEventListener("load", () => resolve(Boolean(window.Lenis)), {
        once: true,
      });
      existingScript.addEventListener("error", () => resolve(false), { once: true });
    });
  }

  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = lenisScriptSrc;
    script.async = true;
    script.onload = () => resolve(Boolean(window.Lenis));
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

function resolveScrollTarget(target: number | string | HTMLElement) {
  if (typeof target === "number") return target;

  const element =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target;

  return element ? element.getBoundingClientRect().top + window.scrollY : 0;
}

function setupFallbackSmoothScroll() {
  let current = window.scrollY;
  let target = window.scrollY;
  let animationFrame = 0;
  let isAnimating = false;
  const ease = 0.095;
  const wheelMultiplier = 0.78;

  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const clampTarget = (value: number) => Math.min(maxScroll(), Math.max(0, value));

  const stop = () => {
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    isAnimating = false;
  };

  const tick = () => {
    current += (target - current) * ease;

    if (Math.abs(target - current) < 0.35) {
      current = target;
      window.scrollTo(0, current);
      stop();
      return;
    }

    window.scrollTo(0, current);
    animationFrame = window.requestAnimationFrame(tick);
  };

  const start = () => {
    if (isAnimating) return;
    isAnimating = true;
    animationFrame = window.requestAnimationFrame(tick);
  };

  const onWheel = (event: WheelEvent) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.defaultPrevented ||
      event.target instanceof Element && event.target.closest("[data-lenis-prevent]")
    ) {
      return;
    }

    event.preventDefault();
    current = window.scrollY;
    target = clampTarget(target + event.deltaY * wheelMultiplier);
    start();
  };

  const onScroll = () => {
    if (isAnimating) return;
    current = window.scrollY;
    target = current;
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("scroll", onScroll, { passive: true });

  return {
    destroy() {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    },
    scrollTo(nextTarget: number | string | HTMLElement) {
      current = window.scrollY;
      target = clampTarget(resolveScrollTarget(nextTarget));
      start();
    },
  };
}

function setupSmoothScroll() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (reduceMotion || isCoarsePointer) return () => {};

  let disposed = false;
  let rafId = 0;
  let cleanup = () => {};

  document.documentElement.classList.add("lenis", "lenis-smooth");

  void loadLenisScript().then((hasLenis) => {
    if (disposed) return;

    if (hasLenis && window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.05,
        easing: (time: number) => 1 - Math.pow(1 - time, 3),
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.82,
      });

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      rafId = window.requestAnimationFrame(raf);
      window.greySmoothScroll = {
        destroy: () => lenis.destroy(),
        scrollTo: (target) => lenis.scrollTo(target, { duration: 1.0 }),
      };
      cleanup = () => {
        if (rafId) window.cancelAnimationFrame(rafId);
        lenis.destroy();
      };
      return;
    }

    const fallback = setupFallbackSmoothScroll();
    window.greySmoothScroll = fallback;
    cleanup = () => fallback.destroy();
  });

  return () => {
    disposed = true;
    cleanup();
    if (window.greySmoothScroll) {
      window.greySmoothScroll = undefined;
    }
    document.documentElement.classList.remove("lenis", "lenis-smooth");
  };
}

function setupImageReveal(root: ParentNode) {
  const images = Array.from(root.querySelectorAll<HTMLImageElement>("img"));

  images.forEach((image) => {
    if (image.dataset.imageRevealBound === "true") return;

    image.dataset.imageRevealBound = "true";
    image.classList.add("image-blur-reveal");

    const markLoaded = () => {
      image.classList.add("is-loaded");
    };

    if (image.complete && image.naturalWidth > 0) {
      window.requestAnimationFrame(markLoaded);
      return;
    }

    image.addEventListener("load", markLoaded, { once: true });
    image.addEventListener("error", markLoaded, { once: true });
  });
}

function clearLegacyRevealClasses(root: ParentNode) {
  const elements = Array.from(
    root.querySelectorAll<HTMLElement>(".motion-reveal, .motion-reveal-child"),
  );

  elements.forEach((element) => {
    element.classList.remove("motion-reveal", "motion-reveal-child", "is-visible");
    element.style.removeProperty("--motion-delay");
  });
}

function setupActiveIndicators(root: ParentNode) {
  const navs = Array.from(
    root.querySelectorAll<HTMLElement>(
      "[data-sidebar-nav], aside nav, .sidebar nav, .side nav, .site-sidebar nav",
    ),
  );

  const cleanups = navs.map((nav) => {
    if (nav.dataset.activeIndicatorBound === "true") return () => {};

    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[href]")).filter(
      (link) => prefersAnchorNavigation(link),
    );

    if (links.length < 2) return () => {};

    nav.dataset.activeIndicatorBound = "true";
    nav.classList.add("sidebar-active-nav");

    const indicator = document.createElement("span");
    indicator.className = "sidebar-active-indicator";
    indicator.setAttribute("aria-hidden", "true");
    nav.prepend(indicator);

    const moveTo = (link: HTMLAnchorElement) => {
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();

      indicator.style.width = `${linkRect.width}px`;
      indicator.style.height = `${linkRect.height}px`;
      indicator.style.transform = `translate3d(${linkRect.left - navRect.left}px, ${
        linkRect.top - navRect.top
      }px, 0)`;
    };

    const setActiveFromHash = () => {
      const active =
        links.find((link) => new URL(link.href).hash === window.location.hash) || links[0];

      links.forEach((link) => {
        link.classList.toggle("is-active", link === active);
      });
      moveTo(active);
    };

    const onResize = () => setActiveFromHash();

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => moveTo(link));
      link.addEventListener("focus", () => moveTo(link));
    });
    nav.addEventListener("mouseleave", setActiveFromHash);
    window.addEventListener("hashchange", setActiveFromHash);
    window.addEventListener("resize", onResize);

    window.requestAnimationFrame(setActiveFromHash);

    return () => {
      window.removeEventListener("hashchange", setActiveFromHash);
      window.removeEventListener("resize", onResize);
      indicator.remove();
      nav.dataset.activeIndicatorBound = "";
      nav.classList.remove("sidebar-active-nav");
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

export default function GlobalExperience() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const cleanupSmoothScroll = setupSmoothScroll();
    return cleanupSmoothScroll;
  }, []);

  useEffect(() => {
    const root = document.body;
    clearLegacyRevealClasses(root);
    setupImageReveal(root);

    const cleanupIndicators = setupActiveIndicators(root);

    return () => {
      cleanupIndicators();
    };
  }, [pathname]);

  useEffect(() => {
    const updateVisibility = () => {
      setShowBackToTop(window.scrollY > Math.max(520, window.innerHeight * 0.55));
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    if (window.greySmoothScroll) {
      window.greySmoothScroll.scrollTo(0);
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {showBackToTop ? (
        <motion.button
          aria-label="Back to top"
          className="grey-back-to-top"
          data-motion-skip="true"
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          type="button"
          onClick={scrollToTop}
        >
          <svg
            aria-hidden="true"
            className="grey-back-to-top-icon"
            fill="none"
            viewBox="0 0 16 28"
          >
            <path d="M8 26V3.5M2.5 9 8 3.5 13.5 9" />
          </svg>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
