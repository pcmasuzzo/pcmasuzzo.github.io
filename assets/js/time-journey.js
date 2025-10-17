document.addEventListener("DOMContentLoaded", function() {
  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const triggers = document.querySelectorAll(".lightbox-trigger");
  const lightboxClose = document.querySelector(".lightbox-close");

  triggers.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

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

  // Panel toggle
  const timelineDots = document.querySelectorAll(".timeline-dot");
  timelineDots.forEach(dot => {
    dot.addEventListener("click", () => {
      // Collapse all panels
      document.querySelectorAll(".timeline-panel").forEach(panel => {
        panel.style.display = "none";
      });

      // Open the corresponding panel
      const entry = dot.closest(".timeline-entry");
      const panel = entry.querySelector(".timeline-panel");
      panel.style.display = "block";

      // Scroll into view smoothly
      entry.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Close button
  const panelCloses = document.querySelectorAll(".panel-close");
  panelCloses.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".timeline-panel").style.display = "none";
    });
  });
});