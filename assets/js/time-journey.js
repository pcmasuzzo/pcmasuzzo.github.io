document.addEventListener("DOMContentLoaded", function() {
  // -------------------------
  // Elements
  // -------------------------
  const timelineDots = document.querySelectorAll(".timeline-dot");
  const timelineEntries = document.querySelectorAll(".timeline-entry");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  // -------------------------
  // Utility: clear active dot
  // -------------------------
  function clearActiveDots() {
    timelineDots.forEach(dot => dot.classList.remove("active-dot"));
  }

  // -------------------------
  // Timeline dot click: toggle panel
  // -------------------------
  timelineDots.forEach(dot => {
    dot.addEventListener("click", () => {
      const entry = dot.closest(".timeline-entry");
      const panel = entry.querySelector(".timeline-panel");
      if (!panel) return;

      const isOpen = panel.style.display === "block";

      // Close all panels first
      timelineEntries.forEach(e => {
        const p = e.querySelector(".timeline-panel");
        if (p) p.style.display = "none";
      });
      clearActiveDots();

      if (!isOpen) {
        // Open clicked panel
        panel.style.display = "block";
        dot.classList.add("active-dot");
        entry.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // -------------------------
  // Panel close buttons
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
  // Lightbox: open images
  // -------------------------
  function attachLightboxTriggers() {
    const triggers = document.querySelectorAll(".lightbox-trigger");
    triggers.forEach(img => {
      if (!img.dataset.listener) {
        img.addEventListener("click", () => {
          if (!lightbox || !lightboxImg) return;
          lightbox.style.display = "flex";
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || "";
        });
        img.dataset.listener = "true";
      }
    });
  }

  // Attach initially
  attachLightboxTriggers();

  // Reattach whenever a panel is opened
  timelineDots.forEach(dot => {
    dot.addEventListener("click", attachLightboxTriggers);
  });

  // Close lightbox
  if (lightbox && lightboxClose && lightboxImg) {
    lightboxClose.addEventListener("click", () => {
      lightbox.style.display = "none";
      lightboxImg.src = "";
      lightboxImg.alt = "";
    });

    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        lightboxImg.src = "";
        lightboxImg.alt = "";
      }
    });
  }
});