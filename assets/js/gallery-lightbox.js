(function() {
  let currentIndex = 0;
  let images = [];
  let lightbox = null;
  let lightboxImg = null;
  let prevBtn = null;
  let nextBtn = null;
  let closeBtn = null;
  let counter = null;

  function createLightbox() {
    // Create lightbox container
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    // Create close button
    closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    
    // Create previous button
    prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-prev';
    prevBtn.innerHTML = '&#10094;';
    prevBtn.setAttribute('aria-label', 'Previous image');
    
    // Create next button
    nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-next';
    nextBtn.innerHTML = '&#10095;';
    nextBtn.setAttribute('aria-label', 'Next image');
    
    // Create image element
    lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-image';
    
    // Create counter
    counter = document.createElement('div');
    counter.className = 'lightbox-counter';
    
    // Append elements
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(counter);
    document.body.appendChild(lightbox);
    
    // Add event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevious);
    nextBtn.addEventListener('click', showNext);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
  }

  function handleKeyboard(e) {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrevious();
    } else if (e.key === 'ArrowRight') {
      showNext();
    }
  }

  function openLightbox(index) {
    currentIndex = index;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateLightbox();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrevious() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  function updateLightbox() {
    lightboxImg.src = images[currentIndex];
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  function init() {
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item div[data-image-url]');
    
    if (galleryItems.length === 0) return;
    
    // Extract image URLs
    images = Array.from(galleryItems).map(item => item.getAttribute('data-image-url'));
    
    // Create lightbox
    createLightbox();
    
    // Add click listeners to gallery items
    galleryItems.forEach((item, index) => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function() {
        openLightbox(index);
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();