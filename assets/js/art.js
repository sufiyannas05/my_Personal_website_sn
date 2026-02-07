(function () {
  var modal = document.getElementById('art-modal');
  var modalImage = modal.querySelector('.art-modal__image');
  var modalTitle = modal.querySelector('.art-modal__title');
  var modalDate = modal.querySelector('.art-modal__date');
  var modalDescription = modal.querySelector('.art-modal__description');
  var closeBtn = modal.querySelector('.art-modal__close');
  var prevBtn = modal.querySelector('.art-modal__nav--prev');
  var nextBtn = modal.querySelector('.art-modal__nav--next');
  var backdrop = modal.querySelector('.art-modal__backdrop');
  var triggers = document.querySelectorAll('.art-project__trigger');
  var projects = Array.from(document.querySelectorAll('.art-project'));
  var currentIndex = 0;

  function showProject(index) {
    if (index < 0) index = projects.length - 1;
    if (index >= projects.length) index = 0;
    currentIndex = index;

    var project = projects[currentIndex];
    var img = project.querySelector('.art-project__image');
    var title = project.querySelector('.art-project__title');
    var date = project.querySelector('.art-project__date');
    var description = project.querySelector('.art-project__description');

    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = title.textContent;
    modalDate.textContent = date.textContent;
    modalDescription.textContent = description.textContent;
  }

  function openModal(project) {
    currentIndex = projects.indexOf(project);
    if (currentIndex < 0) currentIndex = 0;
    showProject(currentIndex);

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
    showProject(currentIndex - 1);
  }

  function showNext() {
    showProject(currentIndex + 1);
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var project = this.closest('.art-project');
      if (project) openModal(project);
    });
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var project = this.closest('.art-project');
        if (project) openModal(project);
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
