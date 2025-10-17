document.addEventListener("DOMContentLoaded", function() {
  // -------------------------
  // Timeline panels with toggle
  // -------------------------
  const timelineDots = document.querySelectorAll(".timeline-dot");
  const timelinePanels = document.querySelectorAll(".timeline-panel");

  // Remove active class from all dots
  function clearActiveDots() {
    timelineDots.forEach(dot => dot.classList.remove("active-dot"));
  }

  timelineDots.forEach(dot => {
    dot.addEventListener("click", () => {
      const entry = dot.closest(".timeline-entry");
      const panel = entry.querySelector(".timeline-panel");

      if (!panel) return;

      const isOpen = panel.style.display === "block";

      // Close all panels first
      timelinePanels.forEach(p => (p.style.display = "none"));
      clearActiveDots();

      if (!isOpen) {
        // Open this panel
        panel.style.display = "block";
        dot.classList.add("active-dot");
        entry.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // else: it was open, now closed; no active dot
    });
  });

  // -------------------------
  // Close panel buttons
  // -------------------------
  const panelCloses = document.querySelectorAll(".panel-close");
  panelCloses.forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = btn.closest(".timeline-panel");
      if (panel) panel.style.display = "none";

      const dot = btn.closest(".timeline-entry").querySelector(".timeline-dot");
      if (dot) dot.classList.remove("active-dot");
    });
  });

  // -------------------------
  // Lightbox functionality
  // -------------------------
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

  if (lightbox && lightboxImg && lightboxClose) {
    // Open lightbox
    lightboxTriggers.forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";
      });
    });

    // Close button
    lightboxClose.addEventListener("click", () => {
      lightbox.style.display = "none";
      lightboxImg.src = "";
      lightboxImg.alt = "";
    });

    // Click outside image to close
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        lightboxImg.src = "";
        lightboxImg.alt = "";
      }
    });
  }
});