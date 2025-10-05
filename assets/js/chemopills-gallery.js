// ============================================
// HOTSPOTS DATA - ADD YOUR SPECIAL MOMENTS HERE
// ============================================

const hotspots = [
  // EXAMPLE: Single image hotspot
  {
    image: "001.jpg",
    info: "first day of chemotherapy - started with low dosage!",
    type: "single"
  },
  
  // EXAMPLE: Group of images
  {
    images: ["196.jpg", "197.jpg", "198.jpg", "199.jpg", "200.jpg"],
    info: "the background is red because this was around christmas time",
    type: "group"
  }
  
  // ADD MORE HOTSPOTS HERE:
  // Single: { image: "pill_XXX.jpg", info: "your text", type: "single" },
  // Group: { images: ["pill_XXX.jpg", "pill_YYY.jpg"], info: "your text", type: "group" }
];


// ============================================
// MAIN CODE - Runs when page loads
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // PART 1: LIGHTBOX
  // ============================================
  
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
  
  // Create lightbox HTML
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
  
  // Lightbox functions
  function openLightbox(index) {
    currentIndex = index;
    lightboxImage.src = imageUrls[currentIndex];
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
  }
  
  function showNext() {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    lightboxImage.src = imageUrls[currentIndex];
  }
  
  function showPrevious() {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    lightboxImage.src = imageUrls[currentIndex];
  }
  
  // Lightbox event listeners
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });
  
  closeBtn.addEventListener('click', closeLightbox);
  leftArrow.addEventListener('click', showPrevious);
  rightArrow.addEventListener('click', showNext);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
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
  
  
  // ============================================
  // PART 2: HOTSPOTS
  // ============================================
  
  // Create the info box that will show hotspot information
  const infoBox = document.createElement('div');
  infoBox.className = 'hotspot-info';
  document.body.appendChild(infoBox);
  
  // Build a map to quickly find which images belong to which hotspots
  // This helps us know: "When hovering image X, what info should I show?"
  const hotspotMap = new Map();
  
  hotspots.forEach((hotspot, hotspotIndex) => {
    if (hotspot.type === 'single') {
      // For single images, map the filename to this hotspot
      hotspotMap.set(hotspot.image, {
        info: hotspot.info,
        relatedImages: [hotspot.image],
        hotspotIndex: hotspotIndex
      });
    } else if (hotspot.type === 'group') {
      // For groups, map EACH image in the group to the SAME hotspot
      hotspot.images.forEach(imageName => {
        hotspotMap.set(imageName, {
          info: hotspot.info,
          relatedImages: hotspot.images, // All images in this group
          hotspotIndex: hotspotIndex
        });
      });
    }
  });
  
  console.log('Hotspot map created:', hotspotMap);
  
  // Add hover listeners to each gallery item
  galleryItems.forEach((item, index) => {
    
    // Get the inner div (the one with background image)
    const innerDiv = item.querySelector('div[data-image-url], div[data-bg]');
    if (!innerDiv) return;
    
    // Extract the filename from the URL
    // e.g., "/assets/images/chemopills/pill_001.jpg" → "pill_001.jpg"
    let imageUrl = innerDiv.getAttribute('data-image-url');
    if (!imageUrl) {
      const dataBg = innerDiv.getAttribute('data-bg');
      if (dataBg) {
        imageUrl = dataBg.replace(/url\(['"]?/, '').replace(/['"]?\)/, '');
      }
    }
    
    if (!imageUrl) return;
    
    const filename = imageUrl.split('/').pop(); // Get last part after last slash
    
    // Check if this image is a hotspot
    const hotspotData = hotspotMap.get(filename);
    
    if (hotspotData) {
      // This IS a hotspot! Add hover events
      
      item.addEventListener('mouseenter', function(e) {
        // Show info and highlight related images
        showHotspot(hotspotData, item, e);
      });
      
      item.addEventListener('mousemove', function(e) {
        // Update info box position as mouse moves
        positionInfoBox(item, e);
      });
      
      item.addEventListener('mouseleave', function() {
        // Hide info and remove highlights
        hideHotspot(hotspotData);
      });
    }
  });
  
  // Function to show hotspot info and highlight images
  function showHotspot(hotspotData, hoveredItem, event) {
    // Set the info text
    infoBox.textContent = hotspotData.info;
    
    // Highlight all related images (for groups, this highlights multiple)
    hotspotData.relatedImages.forEach(relatedFilename => {
      // Find the gallery item with this filename
      galleryItems.forEach(item => {
        const innerDiv = item.querySelector('div[data-image-url], div[data-bg]');
        if (innerDiv) {
          let url = innerDiv.getAttribute('data-image-url');
          if (!url) {
            const dataBg = innerDiv.getAttribute('data-bg');
            if (dataBg) {
              url = dataBg.replace(/url\(['"]?/, '').replace(/['"]?\)/, '');
            }
          }
          if (url && url.endsWith(relatedFilename)) {
            item.classList.add('hotspot-active');
          }
        }
      });
    });
    
    // Position and show the info box
    positionInfoBox(hoveredItem, event);
    infoBox.classList.add('active');
  }
  
  // Function to position the info box above the hovered image
  function positionInfoBox(hoveredItem, event) {
    const rect = hoveredItem.getBoundingClientRect();
    
    // Position above the image, centered
    const left = rect.left + (rect.width / 2) - (infoBox.offsetWidth / 2);
    const top = rect.top - infoBox.offsetHeight - 10; // 10px gap
    
    infoBox.style.left = left + 'px';
    infoBox.style.top = top + window.scrollY + 'px';
  }
  
  // Function to hide hotspot and remove highlights
  function hideHotspot(hotspotData) {
    // Remove all highlights
    galleryItems.forEach(item => {
      item.classList.remove('hotspot-active');
    });
    
    // Hide info box
    infoBox.classList.remove('active');
  }
  
});