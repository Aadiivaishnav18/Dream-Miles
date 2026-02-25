(function () {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("close-btn");
  const overlay = document.getElementById("overlay");
  const body = document.body;
  const sidebarLinks = sidebar.querySelectorAll("a");

  const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
  let previouslyFocused = null;

  function openSidebar() {
    previouslyFocused = document.activeElement;
    sidebar.classList.add("active");
    overlay.classList.add("active");
    body.style.overflow = "hidden";
    const first = sidebar.querySelector(FOCUSABLE);
    if (first) first.focus();
    document.addEventListener("keydown", trapFocus);
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    body.style.overflow = "";
    if (previouslyFocused) previouslyFocused.focus();
    document.removeEventListener("keydown", trapFocus);
  }

  function trapFocus(e) {
    if (e.key === "Escape") return closeSidebar();
    if (e.key !== "Tab") return;

    const focusable = Array.from(sidebar.querySelectorAll(FOCUSABLE));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function handleSidebarNav() {
    closeSidebar();
  }

  menuToggle.addEventListener("click", () => {
    sidebar.classList.contains("active") ? closeSidebar() : openSidebar();
  });

  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
  sidebarLinks.forEach(a => a.addEventListener("click", handleSidebarNav));

})();
