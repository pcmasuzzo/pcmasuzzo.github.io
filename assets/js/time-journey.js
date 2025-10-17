document.addEventListener("DOMContentLoaded", function() {
  // -------------------------
  // Timeline panels
  // -------------------------
  const timelineDots = document.querySelectorAll(".timeline-dot");
  const timelinePanels = document.querySelectorAll(".timeline-panel");

  timelineDots.forEach(dot => {
    dot.addEventListener("click", () => {
      // Collapse all panels
      timelinePanels.forEach(panel => panel.style.display = "none");

      // Open the corresponding panel
      const entry = dot.closest(".timeline-entry");
      const panel = entry.querySelector(".timeline-panel");
      if (panel) {
        panel.style.display = "block";

        // Scroll entry into view smoothly
        entry.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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