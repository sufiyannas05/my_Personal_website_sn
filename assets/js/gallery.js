(function () {
  var modal = document.getElementById('gallery-modal');
  var modalImage = modal.querySelector('.gallery-modal__image');
  var modalDescription = modal.querySelector('.gallery-modal__description');
  var closeBtn = modal.querySelector('.gallery-modal__close');
  var prevBtn = modal.querySelector('.gallery-modal__nav--prev');
  var nextBtn = modal.querySelector('.gallery-modal__nav--next');
  var backdrop = modal.querySelector('.gallery-modal__backdrop');
  var triggers = document.querySelectorAll('.gallery-photo__trigger');
  var photos = Array.from(document.querySelectorAll('.gallery-photo'));
  var currentIndex = 0;

  function showPhoto(index) {
    if (index < 0) index = photos.length - 1;
    if (index >= photos.length) index = 0;
    currentIndex = index;

    var photo = photos[currentIndex];
    var img = photo.querySelector('.gallery-photo__image');
    var description = photo.querySelector('.gallery-photo__description');

    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalDescription.textContent = description.textContent;
  }

  function openModal(photo) {
    currentIndex = photos.indexOf(photo);
    if (currentIndex < 0) currentIndex = 0;
    showPhoto(currentIndex);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showPrev() {
    showPhoto(currentIndex - 1);
  }

  function showNext() {
    showPhoto(currentIndex + 1);
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var photo = this.closest('.gallery-photo');
      if (photo) openModal(photo);
    });
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var photo = this.closest('.gallery-photo');
        if (photo) openModal(photo);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    showPrev();
  });
  nextBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    showNext();
  });

  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      showNext();
    }
  });
})();
