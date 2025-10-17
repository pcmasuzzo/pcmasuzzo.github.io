document.addEventListener('DOMContentLoaded', function() {
  const timelineEntries = document.querySelectorAll('.timeline-entry');
  const basePath = '/assets/images/cancer/time-travel/';
  
  // Click handler for timeline entries
  timelineEntries.forEach(entry => {
    const dot = entry.querySelector('.timeline-dot');
    const dateLabel = entry.querySelector('.timeline-date');
    const closeBtn = entry.querySelector('.panel-close');
    
    // Open panel when clicking dot or date
    [dot, dateLabel].forEach(el => {
      el.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Close all other panels
        timelineEntries.forEach(other => {
          if (other !== entry) {
            other.classList.remove('active');
          }
        });
        
        // Toggle this panel
        entry.classList.toggle('active');
        
        // Load images if not already loaded
        if (entry.classList.contains('active')) {
          loadImages(entry);
        }
      });
    });
    
    // Close button handler
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        entry.classList.remove('active');
      });
    }
  });
  
  // Load images for an entry
  function loadImages(entry) {
    const imageContainers = entry.querySelectorAll('.event-images');
    
    imageContainers.forEach(container => {
      // Skip if already loaded
      if (container.dataset.loaded === 'true') return;
      
      const folder = container.dataset.folder;
      const fullPath = basePath + folder;
      
      // For now, we'll need to manually specify images in YAML
      // Or use a directory listing approach (requires server-side)
      // This is a placeholder that will be enhanced
      
      container.dataset.loaded = 'true';
    });
  }
  
  // Close panel when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.timeline-entry')) {
      timelineEntries.forEach(entry => {
        entry.classList.remove('active');
      });
    }
  });
});