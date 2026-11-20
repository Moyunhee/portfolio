// Light / dark theme toggle (light by default)
(() => {
  const { $, root } = window.App;

  const initTheme = () => {
    const button = $('#themeToggle');
    const isDark = () => root.getAttribute('data-theme') === 'dark';
    const syncLabel = () => {
      button.setAttribute('aria-label', isDark() ? '라이트 모드로 전환' : '다크 모드로 전환');
    };

    button.addEventListener('click', () => {
      root.setAttribute('data-theme', isDark() ? 'light' : 'dark');
      syncLabel();
    });
    syncLabel();
  };

  window.App.initTheme = initTheme;
})();
