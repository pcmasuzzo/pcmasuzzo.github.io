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
  
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Create the info box that will show hotspot information
  const infoBox = document.createElement('div');
  infoBox.className = 'hotspot-info';
  document.body.appendChild(infoBox);
  
  // Build a map: filename → hotspot data
  // This lets us quickly find "what info belongs to this image?"
  const hotspotMap = new Map();
  
  hotspots.forEach((hotspot) => {
    if (hotspot.type === 'single') {
      // Single image: just add one entry
      hotspotMap.set(hotspot.image, {
        info: hotspot.info,
        relatedImages: [hotspot.image]
      });
    } else if (hotspot.type === 'group') {
      // Group: add entry for EACH image, all pointing to same info
      hotspot.images.forEach(imageName => {
        hotspotMap.set(imageName, {
          info: hotspot.info,
          relatedImages: hotspot.images  // All images in the group
        });
      });
    }
  });
  
  console.log('Gallery initialized. Total images:', galleryItems.length);
  console.log('Hotspots defined:', hotspots.length);
  
  // Add hover listeners to each gallery item
  galleryItems.forEach((item) => {
    
    const innerDiv = item.querySelector('div[data-image-url]');
    if (!innerDiv) return;
    
    // Get filename from URL: "/path/to/pill_001.jpg" → "pill_001.jpg"
    const imageUrl = innerDiv.getAttribute('data-image-url');
    if (!imageUrl) return;
    
    const filename = imageUrl.split('/').pop();
    
    // Check if this image is a hotspot
    const hotspotData = hotspotMap.get(filename);
    
    if (hotspotData) {
      // This IS a hotspot! Add hover events
      
      item.addEventListener('mouseenter', function(e) {
        showHotspot(hotspotData, item);
      });
      
      item.addEventListener('mouseleave', function() {
        hideHotspot();
      });
    }
  });
  
  // Show hotspot: display info and highlight related images
  function showHotspot(hotspotData, hoveredItem) {
    // Set the info text
    infoBox.textContent = hotspotData.info;
    
    // Highlight all related images (important for groups!)
    hotspotData.relatedImages.forEach(relatedFilename => {
      galleryItems.forEach(item => {
        const innerDiv = item.querySelector('div[data-image-url]');
        if (innerDiv) {
          const url = innerDiv.getAttribute('data-image-url');
          if (url && url.endsWith(relatedFilename)) {
            item.classList.add('hotspot-active');
          }
        }
      });
    });
    
    // Position the info box above the hovered image
    const rect = hoveredItem.getBoundingClientRect();
    const left = rect.left + (rect.width / 2) - (infoBox.offsetWidth / 2);
    const top = rect.top - infoBox.offsetHeight - 10;
    
    infoBox.style.left = left + 'px';
    infoBox.style.top = top + window.scrollY + 'px';
    
    // Show the info box
    infoBox.classList.add('active');
  }
  
  // Hide hotspot: remove highlights and hide info box
  function hideHotspot() {
    // Remove all highlights
    galleryItems.forEach(item => {
      item.classList.remove('hotspot-active');
    });
    
    // Hide info box
    infoBox.classList.remove('active');
  }
  
});