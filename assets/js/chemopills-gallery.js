// ============================================
// HOTSPOTS DATA - ADD YOUR SPECIAL MOMENTS HERE
// ============================================

const hotspots = [
  {
    image: "001.jpg",
    info: "first day of chemotherapy: started with low dosage, 3 pills of 500 mg",
    type: "single"
  },

  {
    image: "006.jpg",
    info: "I am pretty sure this red background comes from a placemat in a restaurant!",
    type: "single"
  },

  {
    image: "007.jpg",
    info: "this yellow/orange placemat means I was having lunch at myu friend's place :)",
    type: "single"
  },

  {
    image: "013.jpg",
    info: "after the first blood check, the dosage was increased adding a little pill of 150 mg",
    type: "single"
  },
  
  {
    images: ["196.jpg", "197.jpg", "198.jpg", "199.jpg", "200.jpg"],
    info: "the background is red because this was around christmas time",
    type: "group"
  }
  

];


// ============================================
// MAIN CODE - Runs when page loads
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Track whether hotspots are enabled or disabled
  let hotspotsEnabled = false;
  
  // Get the toggle button
  const toggleButton = document.getElementById('toggle-hotspots');
  
  // If button doesn't exist, log warning and enable hotspots by default
  if (!toggleButton) {
    console.warn('Toggle button not found. Hotspots enabled by default.');
    hotspotsEnabled = true;
  }
  
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
  
  // Button click handler - toggles hotspots on/off
  if (toggleButton) {
    toggleButton.addEventListener('click', function() {
      hotspotsEnabled = !hotspotsEnabled; // Toggle true/false
      
      // Update button text based on state
      if (hotspotsEnabled) {
        toggleButton.textContent = 'Hide Hotspots';
        toggleButton.classList.add('active');
      } else {
        toggleButton.textContent = 'Show Hotspots';
        toggleButton.classList.remove('active');
        hideHotspot(); // Hide any currently visible hotspot
      }
      
      console.log('Hotspots enabled:', hotspotsEnabled);
    });
  }
  
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
        // Check if hotspots are enabled before showing
        if (!hotspotsEnabled) return;
        showHotspot(hotspotData, item);
      });
      
      item.addEventListener('mouseleave', function() {
        // Check if hotspots are enabled before hiding
        if (!hotspotsEnabled) return;
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