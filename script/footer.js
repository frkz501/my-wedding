  // for gallery
  const track = document.querySelector('.gallery-track');
  const dotsContainer = document.querySelector('.gallery-dots');
  const images = document.querySelectorAll('.gallery-img');

  // Arrows
  document.querySelector('.arrow.left').addEventListener('click', () => {
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  });
  document.querySelector('.arrow.right').addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
  });

  // Drag functionality
  let isDown = false;
  let startX, scrollLeft;

  track.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.classList.add('dragging');
  });
  track.addEventListener('mouseleave', () => isDown = false);
  track.addEventListener('mouseup', () => isDown = false);
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = x - startX;
    track.scrollLeft = scrollLeft - walk;
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close');
  const lightboxLeft = document.querySelector('.lightbox-arrow.left');
  const lightboxRight = document.querySelector('.lightbox-arrow.right');

  const galleryImages = document.querySelectorAll('.gallery-img');
  let currentImageIndex = -1;

  // Open lightbox
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
      currentImageIndex = index;
    });
  });

  // Close lightbox on close button
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  // Navigate with lightbox arrows
  lightboxLeft.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent triggering click-outside
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
  });

  lightboxRight.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
  });

  // ESC and arrow keys support (works both inside/outside lightbox)
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') {
        lightbox.style.display = 'none';
      } else if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
      } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
      }
    }
  });

  // rsvp shift
  const rsvpBtnWrapper = document.querySelector('.rsvp');
  const rsvpSpace = document.getElementById('rsvp-btn-space');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        rsvpBtnWrapper.classList.add('centered');
      } else {
        rsvpBtnWrapper.classList.remove('centered');
      }
    });
  }, {
    threshold: 0.5
  });
  observer.observe(rsvpSpace);