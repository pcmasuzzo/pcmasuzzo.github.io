// Get elements
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const prevButton = document.getElementById('prevImage');
const nextButton = document.getElementById('nextImage');
const galleryItems = document.querySelectorAll('.gallery-item');

// Array to store image sources for navigation
let images = [];
galleryItems.forEach(item => {
    images.push(item.querySelector('img').src);
});

// Open the modal with the clicked image
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        modal.style.display = 'flex'; // Show the modal
        modalImage.src = images[index]; // Set the image source in modal
        currentIndex = index; // Store the current image index
    });
});

// Close the modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Navigate to the previous image
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    modalImage.src = images[currentIndex];
});

// Navigate to the next image
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    modalImage.src = images[currentIndex];
});

// Allow navigation with arrow keys
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevButton.click(); // Go to previous image
        } else if (e.key === 'ArrowRight') {
            nextButton.click(); // Go to next image
        } else if (e.key === 'Escape') {
            closeModal.click(); // Close modal on Escape
        }
    }
});
