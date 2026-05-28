"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const transitionEase: [number, number, number, number] = [0.76, 0, 0.24, 1];
const routeTitles: Record<string, string> = {
  "/ai-tool": "AI TOOLS",
  "/about": "ABOUT",
  "/color-upgrade": "COLOR",
  "/daily-needs": "DAILY NEEDS",
  "/font-design": "FONT DESIGN",
  "/gate-pay-gift-card": "GIFT CARD",
  "/gate-pay": "GATEPAY",
  "/gate-pay-dashboard": "DASHBOARD",
  "/gate-pay-video": "PRODUCT VIDEO",
  "/icon-upgrade": "ICON",
  "/illustration": "ILLUSTRATION",
};

function cleanPath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function getRouteTitle(nextPath: string) {
  const path = cleanPath(nextPath);

  if (routeTitles[path]) {
    return routeTitles[path];
  }

  if (path === "/") {
    return "HOME";
  }

  return path
    .split("/")
    .filter(Boolean)
    .at(-1)
    ?.replace(/-/g, " ")
    .toUpperCase() ?? "WORK";
}

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const isTransitioning = useRef(false);
  const pendingRoute = useRef<string | null>(null);
  const [transitionTitle, setTransitionTitle] = useState("");
  const [showTitle, setShowTitle] = useState(false);

  const unlockPage = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, []);

  const revealPage = useCallback(async () => {
    await controls.start({
      y: "-102%",
      transition: {
        duration: reduceMotion ? 0.01 : 0.9,
        ease: transitionEase,
      },
    });

    controls.set({ y: "100%" });
    setShowTitle(false);
    setTransitionTitle("");
    isTransitioning.current = false;
    pendingRoute.current = null;
    unlockPage();
  }, [controls, reduceMotion, unlockPage]);

  useEffect(() => {
    const route = pendingRoute.current;

    if (!route) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const destination = new URL(route, window.location.origin);

      if (!destination.hash) {
        window.scrollTo(0, 0);
      }

      void revealPage();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, revealPage]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        isTransitioning.current
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");

      if (
        !link ||
        (link.target && link.target !== "_self") ||
        link.hasAttribute("download") ||
        link.hasAttribute("data-no-transition") ||
        link.dataset.transition === "none"
      ) {
        window.sessionStorage.removeItem("grey-page-transition");
        return;
      }

      const destination = new URL(link.href);

      if (destination.origin !== window.location.origin) {
        return;
      }

      const isSamePageHash =
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search &&
        destination.hash;
      const isSameRoute =
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search &&
        !destination.hash;

      if (isSamePageHash || isSameRoute) {
        return;
      }

      event.preventDefault();

      const nextRoute = `${destination.pathname}${destination.search}${destination.hash}`;
      isTransitioning.current = true;
      pendingRoute.current = nextRoute;
      if (cleanPath(destination.pathname) === "/") {
        window.sessionStorage.setItem("grey-page-transition", "1");
      } else {
        window.sessionStorage.removeItem("grey-page-transition");
      }
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      setTransitionTitle(link.dataset.transitionTitle || getRouteTitle(destination.pathname));
      setShowTitle(false);
      controls.set({ y: "100%" });
      void controls
        .start({
          y: "0%",
          transition: {
            duration: reduceMotion ? 0.01 : 0.82,
            ease: transitionEase,
          },
        })
        .then(() => {
          setShowTitle(true);

          window.setTimeout(
            () => {
              router.push(nextRoute);
            },
            reduceMotion ? 0 : 360,
          );
        });
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      unlockPage();
    };
  }, [controls, reduceMotion, router, unlockPage]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[120] grid place-items-center bg-[#050505]"
      initial={{ y: "100%" }}
      animate={controls}
      style={{
        willChange: "transform",
      }}
    >
      <motion.div
        className="flex items-center justify-center gap-4 px-6 text-center font-clash text-[40px] font-normal uppercase leading-none tracking-[0.22em] text-white/90 max-sm:text-[32px]"
        initial={false}
        animate={{
          opacity: showTitle ? 1 : 0,
          y: showTitle ? 0 : 18,
        }}
        transition={{
          duration: reduceMotion ? 0.01 : 0.28,
          ease: transitionEase,
        }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-white/75" />
        <span>{transitionTitle}</span>
      </motion.div>
    </motion.div>
  );
}
