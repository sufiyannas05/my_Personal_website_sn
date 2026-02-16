(function () {
  var modal = document.getElementById('fusion-modal');
  if (!modal) return;

  var viewer = modal.querySelector('#fusion-modal-viewer');
  var titleEl = document.getElementById('fusion-modal-title');
  var closeBtn = modal.querySelector('.fusion-modal__close');
  var backdrop = modal.querySelector('.fusion-modal__backdrop');
  var projects = document.querySelectorAll('.fusion-project');

  function openModal(src, title) {
    viewer.src = src;
    viewer.alt = title + ' 3D model';
    if (titleEl) titleEl.textContent = title;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projects.forEach(function (project) {
    var src = project.getAttribute('data-src');
    var title = project.getAttribute('data-title') || '';
    var triggers = project.querySelectorAll('.fusion-viewer-btn, .art-project__title');

    function open() {
      if (src) openModal(src, title);
    }

    triggers.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        open();
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
