(function () {
  const STORAGE_KEY = 'theme';
  const LIGHT = 'light';
  const DARK = 'dark';

  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY) || LIGHT;
  }

  function setTheme(theme) {
    document.body.classList.remove(LIGHT, DARK);
    document.body.classList.add(theme);
    document.querySelectorAll('.theme-toggle__btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function init() {
    var theme = getStoredTheme();
    setTheme(theme);

    document.querySelectorAll('.theme-toggle__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTheme(this.getAttribute('data-theme'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Mobile menu toggle
(function () {
  function initMenu() {
    var header = document.querySelector('.header');
    var menuBtn = document.querySelector('.header__menu-btn');
    var navLinks = document.querySelectorAll('.header__nav .header__link');
    if (!header || !menuBtn) return;

    function closeMenu() {
      header.classList.remove('header--menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function openMenu() {
      header.classList.add('header--menu-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function toggleMenu() {
      if (header.classList.contains('header--menu-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    menuBtn.addEventListener('click', toggleMenu);

    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    initMenu();
  }
})();
