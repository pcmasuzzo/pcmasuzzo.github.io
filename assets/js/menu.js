// Mobile Menu Toggle Script

// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
  
  // Find the hamburger icon
  const hamburger = document.querySelector('.hamburger');
  
  // Find the navigation menu
  const navMenu = document.querySelector('.nav-menu');
  
  // Check if both elements exist
  if (hamburger && navMenu) {
    
    // Add click event listener to hamburger
    hamburger.addEventListener('click', function() {
      
      // Toggle the 'active' class on the menu
      navMenu.classList.toggle('active');
      
      // Toggle the 'active' class on the hamburger (for animation)
      hamburger.classList.toggle('active');
      
      // Update aria-expanded for accessibility
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      
    });
    
    // Optional: Close menu when clicking on a menu link (good UX)
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
    
  }
  
});