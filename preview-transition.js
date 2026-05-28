(function () {
  const transitionEase = "cubic-bezier(0.76, 0, 0.24, 1)";
  const storageKey = "grey-preview-page-transition";
  const routeTitles = {
    "preview.html": "HOME",
    "preview-about.html": "ABOUT",
    "preview-ai-tool.html": "AI TOOLS",
    "preview-color-upgrade.html": "COLOR",
    "preview-daily-needs.html": "DAILY NEEDS",
    "preview-font-design.html": "FONT DESIGN",
    "preview-gate-pay-dashboard.html": "DASHBOARD",
    "preview-gate-pay-gift-card.html": "GIFT CARD",
    "preview-gate-pay-video.html": "PRODUCT VIDEO",
    "preview-gate-pay.html": "GATEPAY",
    "preview-icon-upgrade.html": "ICON",
    "preview-illustration.html": "ILLUSTRATION",
  };

  function addStyles() {
    if (document.getElementById("grey-preview-transition-style")) return;

    const style = document.createElement("style");
    style.id = "grey-preview-transition-style";
    style.textContent = `
      .grey-preview-transition {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: grid;
        place-items: center;
        pointer-events: none;
        background: #050505;
        transform: translateY(100%);
        will-change: transform;
      }

      .grey-preview-transition__title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        padding-inline: 24px;
        color: rgba(255, 255, 255, 0.9);
        font-family: "Clash Display", Aeonik, Inter, ui-sans-serif, system-ui, sans-serif;
        font-size: 40px;
        font-weight: 400;
        letter-spacing: 0.22em;
        line-height: 1;
        opacity: 0;
        text-align: center;
        text-transform: uppercase;
        transform: translateY(18px);
        transition: opacity 280ms ${transitionEase}, transform 280ms ${transitionEase};
      }

      .grey-preview-transition__dot {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.75);
      }

      .grey-preview-transition.is-entering {
        transform: translateY(0);
        transition: transform 820ms ${transitionEase};
      }

      .grey-preview-transition.is-arriving {
        transform: translateY(0);
        transition: none;
      }

      .grey-preview-transition.has-title .grey-preview-transition__title {
        opacity: 1;
        transform: translateY(0);
      }

      .grey-preview-transition.is-leaving {
        transform: translateY(-102%);
        transition: transform 900ms ${transitionEase};
      }

      @media (max-width: 640px) {
        .grey-preview-transition__title {
          font-size: 32px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .grey-preview-transition,
        .grey-preview-transition__title {
          transition-duration: 1ms !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createOverlay() {
    let overlay = document.querySelector(".grey-preview-transition");
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.className = "grey-preview-transition";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <div class="grey-preview-transition__title">
        <span class="grey-preview-transition__dot"></span>
        <span class="grey-preview-transition__label"></span>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  function getFileName(url) {
    const parts = url.pathname.split("/");
    return decodeURIComponent(parts[parts.length - 1] || "preview.html");
  }

  function getTitle(destination, link) {
    if (link.dataset.transitionTitle) return link.dataset.transitionTitle;
    if (destination.hash === "#work") return "WORK";
    if (destination.hash === "#about") return "ABOUT";

    const fileName = getFileName(destination);
    if (routeTitles[fileName]) return routeTitles[fileName];

    const text = (link.textContent || "").replace(/\s+/g, " ").trim();
    return text || "WORK";
  }

  function isPreviewInternalLink(destination) {
    if (destination.protocol !== "file:" && destination.origin !== window.location.origin) {
      return false;
    }

    return getFileName(destination).startsWith("preview");
  }

  function isSameLocation(destination) {
    return (
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search &&
      destination.hash === window.location.hash
    );
  }

  function shouldSkip(event, link, destination) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target ||
      link.hasAttribute("download") ||
      link.hasAttribute("data-no-transition") ||
      link.classList.contains("brand-link") ||
      link.classList.contains("site-brand") ||
      link.getAttribute("aria-label") === "Grey home"
    ) {
      return true;
    }

    if (!isPreviewInternalLink(destination)) return true;
    if (isSameLocation(destination)) return true;

    const isSamePageHash =
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search &&
      destination.hash;

    return Boolean(isSamePageHash);
  }

  function playEnter(title, destinationHref) {
    const overlay = createOverlay();
    const label = overlay.querySelector(".grey-preview-transition__label");
    if (label) label.textContent = title;

    overlay.className = "grey-preview-transition";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      overlay.classList.add("is-entering");
    });

    window.setTimeout(() => {
      overlay.classList.add("has-title");
    }, 820);

    window.setTimeout(() => {
      window.sessionStorage.setItem(storageKey, JSON.stringify({ title }));
      window.location.href = destinationHref;
    }, 1180);
  }

  function playArrival() {
    const stored = window.sessionStorage.getItem(storageKey);
    if (!stored) return;

    window.sessionStorage.removeItem(storageKey);

    let title = "WORK";
    try {
      title = JSON.parse(stored).title || title;
    } catch (_error) {
      title = "WORK";
    }

    const overlay = createOverlay();
    const label = overlay.querySelector(".grey-preview-transition__label");
    if (label) label.textContent = title;

    overlay.className = "grey-preview-transition is-arriving has-title";
    document.documentElement.classList.remove("grey-preview-transition-pending");
    document.getElementById("grey-preview-transition-boot-style")?.remove();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        overlay.classList.remove("is-arriving");
        overlay.classList.add("is-leaving");
      });
    });

    window.setTimeout(() => {
      overlay.remove();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }, 1000);
  }

  function bindClicks() {
    document.addEventListener(
      "click",
      (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const link = target.closest("a[href]");
        if (!link) return;

        const destination = new URL(link.href, window.location.href);
        if (shouldSkip(event, link, destination)) return;

        event.preventDefault();
        playEnter(getTitle(destination, link), destination.href);
      },
      true,
    );
  }

  addStyles();
  bindClicks();
  playArrival();
})();
