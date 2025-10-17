document.addEventListener("DOMContentLoaded", () => {
  const entries = document.querySelectorAll(".timeline-entry");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  // ---- PANEL TOGGLING ----
  entries.forEach(entry => {
    const panel = entry.querySelector(".timeline-panel");
    const closeBtn = entry.querySelector(".panel-close");

    // Open/close panel when timeline entry is clicked
    entry.addEventListener("click", e => {
      // Avoid triggering if clicking inside the panel itself
      if (e.target.closest(".timeline-panel")) return;

      // Close all other panels first
      document.querySelectorAll(".timeline-entry.active").forEach(openEntry => {
        if (openEntry !== entry) {
          openEntry.classList.remove("active");
        }
      });

      // Toggle current one
      entry.classList.toggle("active");
    });

    // Close panel button
    closeBtn.addEventListener("click", e => {
      e.stopPropagation();
      entry.classList.remove("active");
    });
  });

  // ---- LIGHTBOX ----
  document.body.addEventListener("click", e => {
    if (e.target.matches(".event-images img")) {
      lightboxImg.src = e.target.src;
      lightbox.classList.add("active");
    }
  });

  // Close lightbox
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
    lightboxImg.src = "";
  });

  // Close on overlay click
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      lightboxImg.src = "";
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      lightbox.classList.remove("active");
      lightboxImg.src = "";
    }
  });
});
