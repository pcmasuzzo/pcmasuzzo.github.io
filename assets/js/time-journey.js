document.addEventListener("DOMContentLoaded", function() {
  const timelineDots = document.querySelectorAll(".timeline-dot");
  const timelineEntries = document.querySelectorAll(".timeline-entry");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  // -------------------------
  // Timeline dot toggle
  // -------------------------
  function clearActiveDots() {
    timelineDots.forEach(dot => dot.classList.remove("active-dot"));
  }

  timelineDots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent conflicts with delegated clicks
      const entry = dot.closest(".timeline-entry");
      const panel = entry.querySelector(".timeline-panel");
      if (!panel) return;

      const isOpen = panel.style.display === "block";

      // Close all panels
      timelineEntries.forEach(e => {
        const p = e.querySelector(".timeline-panel");
        if (p) p.style.display = "none";
      });
      clearActiveDots();

      if (!isOpen) {
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
  // Lightbox: event delegation
  // -------------------------
  if (lightbox && lightboxImg && lightboxClose) {
    // Delegate click only for images
    document.querySelector(".timeline-container").addEventListener("click", function(e) {
      const img = e.target.closest(".lightbox-trigger");
      if (!img) return;
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
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
  }
});