// ============================================
// HOTSPOTS DATA - ADD YOUR SPECIAL MOMENTS HERE
// ============================================

const hotspots = [
  {
    image: "IMG_20240807_075845.jpg",
    info: "first day of chemotherapy: I started with the lowest dosage, 3 pills of 500mg",
    type: "single"
  },

  {
    image: "IMG_20240807_203430.jpg",
    info: "my first meal out while on oral chemotherapy - it was Thai food!",
    type: "single"
  },

  {
    image: "IMG_20240811_075855.jpg",
    info: "this yellow/orange placemat means I was having lunch at my friend's place :)",
    type: "single"
  },
  
  {
    image: "IMG_20240814_074233.jpg",
    info: "a blood test after the first 7 days showed I was doing OK enough to add another pill of 150mg",
    type: "single"
  },

  {
    image: "IMG_20240828_073015.jpg",
    info: "after two full weeks, my dose went up again: 3 pills of 500mg + 2 pills of 150mg",
    type: "single"
  },

  {
    image: "IMG_20240904_195922.jpg",
    info: "this was on my birthday: there were rainbow napkins and a lot of feelings",
    type: "single"
  },

  {
    image: "IMG_20240918_075028.jpg",
    info: "the dose went up again, from 1.8g to 2.15g",
    type: "single"
  },

  {
    image: "IMG_20241017_200259.jpg",
    info: "we must have had guests over for dinner, though I can't explain the napkin choice for october...",
    type: "single"
  },

  {
    image: "IMG_20241122_194350.jpg",
    info: "I got an eggplant dish from my friend and I started using it straight away!",
    type: "single"
  },

  {
    image: "IMG_20241123_195830.jpg",
    info: "another funny napkin: this was for Andrea's birthday <3",
    type: "single"
  },

  {
    images: ["IMG_20250101_075142.jpg", "IMG_20250101_195548.jpg",
        "IMG_20250102_075908.jpg", "IMG_20250102_195935.jpg",
        "IMG_20250103_075840.jpg"],
    info: "the first chemo of 2025: I use the read tablecloth for NYE!",
    type: "group"
  },

  {
    image: "IMG_20250114_200505.jpg",
    info: "last day of chemotherapy - yay!",
    type: "single"
  },
  
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
      hotspotsEnabled = !hotspotsEnabled;

      if (hotspotsEnabled) {
        toggleButton.textContent = 'hide hotspots';
        toggleButton.classList.add('active');
        applyHotspotHighlights(); 
      } else {
        toggleButton.textContent = 'show hotspots';
        toggleButton.classList.remove('active');
        removeHotspotHighlights(); 
        hideHotspot(); 
      }

      console.log('Hotspots enabled:', hotspotsEnabled);
    });
  }
  
  // Add hover listeners to each gallery item
  galleryItems.forEach((item) => {
    const innerDiv = item.querySelector('div[data-image-url]');
    if (!innerDiv) return;

    const imageUrl = innerDiv.getAttribute('data-image-url');
    if (!imageUrl) return;

    const filename = imageUrl.split('/').pop();
    const hotspotData = hotspotMap.get(filename);

    if (hotspotData) {
      item.addEventListener('mouseenter', function(e) {
        if (!hotspotsEnabled) return;
        showHotspot(hotspotData, item);
      });

      item.addEventListener('mouseleave', function() {
        if (!hotspotsEnabled) return;
        hideHotspot();
      });
    }
  });

  function applyHotspotHighlights() {
    galleryItems.forEach((item) => {
      const innerDiv = item.querySelector('div[data-image-url]');
      if (!innerDiv) return;

      const imageUrl = innerDiv.getAttribute('data-image-url');
      const filename = imageUrl.split('/').pop();

      if (hotspotMap.has(filename)) {
        item.classList.add('hotspot-active');
      }
    });
  }
  
  function removeHotspotHighlights() {
    galleryItems.forEach((item) => {
      item.classList.remove('hotspot-active');
    });
  }

  // Show hotspot: display info and highlight related images
  function showHotspot(hotspotData, hoveredItem) {
    // Set the info text
    infoBox.textContent = hotspotData.info;
    
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
    // Hide info box
    infoBox.classList.remove('active');
  }
  
});