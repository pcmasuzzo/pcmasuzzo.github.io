// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Get all gallery items (the parent divs)
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;
  let imageUrls = [];
  
  // Extract image URLs from data-image-url attributes
  galleryItems.forEach(item => {
    const innerDiv = item.querySelector('div[data-image-url]');
    if (innerDiv) {
      imageUrls.push(innerDiv.getAttribute('data-image-url'));
    }
  });
  
  // Create lightbox HTML structure
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close">&times;</button>
    <button class="lightbox-arrow lightbox-arrow-left">&#8249;</button>
    <img class="lightbox-image" src="" alt="Gallery Image">
    <button class="lightbox-arrow lightbox-arrow-right">&#8250;</button>
  `;
  document.body.appendChild(lightbox);
  
  // Get lightbox elements
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const leftArrow = lightbox.querySelector('.lightbox-arrow-left');
  const rightArrow = lightbox.querySelector('.lightbox-arrow-right');
  
  // Function to open lightbox
  function openLightbox(index) {
    currentIndex = index;
    lightboxImage.src = imageUrls[currentIndex];
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
  }
  
  // Function to close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
  }
  
  // Function to show next image
  function showNext() {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    lightboxImage.src = imageUrls[currentIndex];
  }
  
  // Function to show previous image
  function showPrevious() {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    lightboxImage.src = imageUrls[currentIndex];
  }
  
  // Add click event to each gallery item
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });
  
  // Close button click
  closeBtn.addEventListener('click', closeLightbox);
  
  // Arrow button clicks
  leftArrow.addEventListener('click', showPrevious);
  rightArrow.addEventListener('click', showNext);
  
  // Close lightbox when clicking on the dark background
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrevious();
    }
  });
  
});