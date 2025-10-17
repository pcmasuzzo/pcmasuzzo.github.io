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
  const panelCloses = document.querySelectorAll(".panel-close");
  panelCloses.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".timeline-panel").style.display = "none";
    });
  });
});