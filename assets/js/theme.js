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

// Easter egg hint: 1 click → black screen, message; disabled after first press
(function () {
  var used = false;

  function init() {
    var trigger = document.getElementById('easter-egg-hint-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      if (used) return;
      used = true;
      trigger.style.pointerEvents = 'none';
      var overlay = document.createElement('div');
      overlay.className = 'easter-egg-hint-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = '<p class="easter-egg-hint-overlay__message">Press on it five times :)</p>';
      document.body.appendChild(overlay);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      setTimeout(function () {
        overlay.remove();
      }, 3200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Easter egg: 5 clicks required to navigate to gaIlery.html
(function () {
  var CLICKS_REQUIRED = 5;
  var RESET_MS = 1500;
  var count = 0;
  var resetTimer = null;

  function init() {
    var trigger = document.getElementById('easter-egg-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      count++;
      clearTimeout(resetTimer);
      if (count >= CLICKS_REQUIRED) {
        window.location.href = 'gaIlery.html';
      } else {
        resetTimer = setTimeout(function () {
          count = 0;
        }, RESET_MS);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
