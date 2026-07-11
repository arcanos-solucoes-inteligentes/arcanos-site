const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const menuPanel = document.querySelector("[data-menu-panel]");
const navLinks = document.querySelectorAll("[data-menu-panel] a");
const siteHeader = document.querySelector("[data-site-header]");

if (menuToggle && menuPanel) {
  const setMenuState = (isOpen) => {
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuPanel.setAttribute("aria-hidden", String(!isOpen));

    if (isOpen) {
      menuClose?.focus();
    } else {
      menuToggle.focus();
    }
  };

  setMenuState(false);

  menuToggle.addEventListener("click", () => setMenuState(true));
  menuClose?.addEventListener("click", () => setMenuState(false));

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
      setMenuState(false);
    }
  });
}

if (siteHeader) {
  const compactThreshold = 24;
  let ticking = false;

  const syncHeaderState = () => {
    siteHeader.classList.toggle("is-compact", window.scrollY > compactThreshold);
    ticking = false;
  };

  syncHeaderState();

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(syncHeaderState);
        ticking = true;
      }
    },
    { passive: true }
  );
}
