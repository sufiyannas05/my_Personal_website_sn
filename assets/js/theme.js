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
