// Smooth scroll for anchor links (Art uses target="_blank", handled by HTML)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Project image zoom
(function () {
  const modal = document.getElementById('image-zoom-modal');
  if (!modal) return;
  const modalImg = modal.querySelector('.image-zoom-modal__image');
  const closeBtn = modal.querySelector('.image-zoom-modal__close');
  const backdrop = modal.querySelector('.image-zoom-modal__backdrop');
  const zoomableImages = document.querySelectorAll('.projects__image--zoomable');

  function openZoom(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeZoom() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  zoomableImages.forEach(function (img) {
    img.addEventListener('click', function () {
      openZoom(this.src, this.alt);
    });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openZoom(this.src, this.alt);
      }
    });
  });

  closeBtn.addEventListener('click', closeZoom);
  backdrop.addEventListener('click', closeZoom);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeZoom();
    }
  });
})();
