(function () {
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const lenisScriptSrc = "https://unpkg.com/lenis/dist/lenis.min.js";

  function addStyles() {
    if (document.getElementById("grey-preview-experience-style")) return;

    const style = document.createElement("style");
    style.id = "grey-preview-experience-style";
    style.textContent = `
      html {
        scrollbar-width: none;
      }

      html::-webkit-scrollbar,
      body::-webkit-scrollbar {
        display: none;
      }

      html.lenis,
      html.lenis body {
        height: auto;
      }

      .lenis.lenis-smooth {
        scroll-behavior: auto !important;
      }

      .lenis.lenis-smooth [data-lenis-prevent] {
        overscroll-behavior: contain;
      }

      .lenis.lenis-stopped {
        overflow: hidden;
      }

      .image-blur-reveal {
        opacity: 0;
        filter: blur(12px);
        transition: opacity 720ms ${ease}, filter 900ms ${ease};
        will-change: opacity, filter;
      }

      .image-blur-reveal.is-loaded {
        opacity: 1;
        filter: blur(0);
      }

      .grey-back-to-top {
        position: fixed;
        right: clamp(18px, 3vw, 44px);
        bottom: clamp(18px, 3vw, 44px);
        z-index: 1000;
        display: grid;
        width: 46px;
        height: 46px;
        place-items: center;
        border: 1px solid rgba(241, 233, 220, 0.18);
        border-radius: 999px;
        background: rgba(5, 5, 5, 0.72);
        color: rgba(255, 255, 255, 0.86);
        cursor: pointer;
        font-family: Aeonik, Inter, ui-sans-serif, system-ui, sans-serif;
        opacity: 0;
        pointer-events: none;
        transform: translate3d(0, 10px, 0) scale(0.92);
        transition:
          opacity 280ms ${ease},
          transform 280ms ${ease},
          border-color 260ms ${ease},
          color 260ms ${ease},
          background 260ms ${ease};
        backdrop-filter: blur(10px);
        box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
      }

      .grey-back-to-top.is-visible {
        opacity: 1;
        pointer-events: auto;
        transform: translate3d(0, 0, 0) scale(1);
      }

      .grey-back-to-top-icon {
        display: block;
        width: 16px;
        height: 28px;
        overflow: visible;
        stroke: currentColor;
        stroke-width: 1.35;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .grey-back-to-top:hover,
      .grey-back-to-top:focus-visible {
        border-color: rgba(241, 233, 220, 0.34);
        background: rgba(15, 15, 15, 0.86);
        color: #ffffff;
        outline: none;
      }

      .sidebar-active-nav {
        position: relative;
      }

      .sidebar-active-nav a {
        position: relative;
        z-index: 1;
        transition: color 260ms ${ease}, opacity 260ms ${ease};
      }

      .sidebar-active-nav a.is-active {
        color: #ffffff;
      }

      .sidebar-active-indicator {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        border: 1px solid rgba(241, 233, 220, 0.1);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.06);
        pointer-events: none;
        transition: width 360ms ${ease}, height 360ms ${ease}, transform 360ms ${ease};
      }

      @media (prefers-reduced-motion: reduce) {
        .image-blur-reveal {
          opacity: 1 !important;
          filter: none !important;
          transform: none !important;
          transition-duration: 1ms !important;
        }

        .grey-back-to-top {
          transition-duration: 1ms !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function loadLenisScript() {
    if (window.Lenis) return Promise.resolve(true);

    const existingScript = document.querySelector(`script[src="${lenisScriptSrc}"]`);
    if (existingScript) {
      return new Promise((resolve) => {
        existingScript.addEventListener("load", () => resolve(Boolean(window.Lenis)), { once: true });
        existingScript.addEventListener("error", () => resolve(false), { once: true });
      });
    }

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = lenisScriptSrc;
      script.async = true;
      script.onload = () => resolve(Boolean(window.Lenis));
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  function resolveScrollTarget(target) {
    if (typeof target === "number") return target;

    const element = typeof target === "string" ? document.querySelector(target) : target;
    return element ? element.getBoundingClientRect().top + window.scrollY : 0;
  }

  function setupFallbackSmoothScroll() {
    let current = window.scrollY;
    let target = window.scrollY;
    let animationFrame = 0;
    let isAnimating = false;
    const scrollEase = 0.095;
    const wheelMultiplier = 0.78;

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const clampTarget = (value) => Math.min(maxScroll(), Math.max(0, value));

    const stop = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      isAnimating = false;
    };

    const tick = () => {
      current += (target - current) * scrollEase;

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

    const onWheel = (event) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.defaultPrevented ||
        (event.target instanceof Element && event.target.closest("[data-lenis-prevent]"))
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
      scrollTo(nextTarget) {
        current = window.scrollY;
        target = clampTarget(resolveScrollTarget(nextTarget));
        start();
      },
    };
  }

  function setupSmoothScroll() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reduceMotion || isCoarsePointer || window.greySmoothScroll) return;

    document.documentElement.classList.add("lenis", "lenis-smooth");

    loadLenisScript().then((hasLenis) => {
      if (window.greySmoothScroll) return;

      if (hasLenis && window.Lenis) {
        const lenis = new window.Lenis({
          duration: 1.05,
          easing: (time) => 1 - Math.pow(1 - time, 3),
          lerp: 0.085,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 0.82,
        });

        const raf = (time) => {
          lenis.raf(time);
          window.requestAnimationFrame(raf);
        };

        window.requestAnimationFrame(raf);
        window.greySmoothScroll = {
          destroy: () => lenis.destroy(),
          scrollTo: (target) => lenis.scrollTo(target, { duration: 1.0 }),
        };
        return;
      }

      window.greySmoothScroll = setupFallbackSmoothScroll();
    });
  }

  function setupImages() {
    document.querySelectorAll("img").forEach((image) => {
      if (image.dataset.imageRevealBound === "true") return;

      image.dataset.imageRevealBound = "true";
      image.classList.add("image-blur-reveal");

      const show = () => image.classList.add("is-loaded");
      if (image.complete && image.naturalWidth > 0) {
        requestAnimationFrame(show);
      } else {
        image.addEventListener("load", show, { once: true });
        image.addEventListener("error", show, { once: true });
      }
    });
  }

  function clearLegacyRevealClasses() {
    document.querySelectorAll(".motion-reveal, .motion-reveal-child").forEach((element) => {
      element.classList.remove("motion-reveal", "motion-reveal-child", "is-visible");
      element.style.removeProperty("--motion-delay");
    });
  }

  function setupBackToTop() {
    if (document.querySelector(".grey-back-to-top")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "grey-back-to-top";
    button.setAttribute("aria-label", "Back to top");
    button.setAttribute("data-motion-skip", "true");
    button.innerHTML = '<svg aria-hidden="true" class="grey-back-to-top-icon" fill="none" viewBox="0 0 16 28"><path d="M8 26V3.5M2.5 9 8 3.5 13.5 9"></path></svg>';
    document.body.appendChild(button);

    const update = () => {
      const threshold = Math.max(520, window.innerHeight * 0.55);
      button.classList.toggle("is-visible", window.scrollY > threshold);
    };

    button.addEventListener("click", () => {
      if (window.greySmoothScroll) {
        window.greySmoothScroll.scrollTo(0);
        return;
      }

      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupActiveIndicators() {
    const navs = Array.from(
      document.querySelectorAll("[data-sidebar-nav], aside nav, .sidebar nav, .side nav, .site-sidebar nav"),
    );

    navs.forEach((nav) => {
      if (!(nav instanceof HTMLElement)) return;
      if (nav.dataset.activeIndicatorBound === "true") return;

      const links = Array.from(nav.querySelectorAll("a[href]")).filter((link) => {
        if (!(link instanceof HTMLAnchorElement)) return false;
        const href = link.getAttribute("href") || "";
        return href.startsWith("#") || href.includes("#");
      });

      if (links.length < 2) return;

      nav.dataset.activeIndicatorBound = "true";
      nav.classList.add("sidebar-active-nav");

      const indicator = document.createElement("span");
      indicator.className = "sidebar-active-indicator";
      indicator.setAttribute("aria-hidden", "true");
      nav.prepend(indicator);

      const moveTo = (link) => {
        const navRect = nav.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.height = `${linkRect.height}px`;
        indicator.style.transform = `translate3d(${linkRect.left - navRect.left}px, ${
          linkRect.top - navRect.top
        }px, 0)`;
      };

      const setActive = () => {
        const active = links.find((link) => new URL(link.href).hash === window.location.hash) || links[0];
        links.forEach((link) => link.classList.toggle("is-active", link === active));
        moveTo(active);
      };

      links.forEach((link) => {
        link.addEventListener("mouseenter", () => moveTo(link));
        link.addEventListener("focus", () => moveTo(link));
      });
      nav.addEventListener("mouseleave", setActive);
      window.addEventListener("hashchange", setActive);
      window.addEventListener("resize", setActive);
      requestAnimationFrame(setActive);
    });
  }

  function init() {
    addStyles();
    setupSmoothScroll();
    clearLegacyRevealClasses();
    setupImages();
    setupBackToTop();
    setupActiveIndicators();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
