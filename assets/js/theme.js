(function () {
  const STORAGE_KEY = 'theme';
  const LIGHT = 'light';
  const DARK = 'dark';
  const SYSTEM = 'system';

  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY) || SYSTEM;
  }

  function getSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK;
    }
    return LIGHT;
  }

  function getResolvedTheme(storedTheme) {
    if (storedTheme === SYSTEM) {
      return getSystemPreference();
    }
    return storedTheme;
  }

  function applyTheme(storedTheme) {
    var resolved = getResolvedTheme(storedTheme);
    document.body.classList.remove(LIGHT, DARK);
    document.body.classList.add(resolved);
    document.querySelectorAll('.theme-toggle__btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === storedTheme);
    });
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }

  function init() {
    var storedTheme = getStoredTheme();
    applyTheme(storedTheme);

    document.querySelectorAll('.theme-toggle__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTheme(this.getAttribute('data-theme'));
      });
    });

    var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', function () {
        if (getStoredTheme() === SYSTEM) {
          applyTheme(SYSTEM);
        }
      });
    }
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
