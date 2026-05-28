(function () {
  const storageKey = "grey-preview-page-transition";

  try {
    if (!window.sessionStorage.getItem(storageKey)) return;
  } catch (_error) {
    return;
  }

  document.documentElement.classList.add("grey-preview-transition-pending");

  if (document.getElementById("grey-preview-transition-boot-style")) return;

  const style = document.createElement("style");
  style.id = "grey-preview-transition-boot-style";
  style.textContent = `
    html.grey-preview-transition-pending,
    html.grey-preview-transition-pending body {
      overflow: hidden !important;
      background: #050505 !important;
    }

    html.grey-preview-transition-pending::before {
      content: "";
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      background: #050505;
    }
  `;
  document.head.appendChild(style);
})();
