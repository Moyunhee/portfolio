// Entry point
(() => {
  const App = window.App;
  const { $, scrollBehavior } = App;

  // Always start at the top
  const resetScroll = () => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    window.scrollTo(0, 0);
    ['load', 'pageshow'].forEach((type) => window.addEventListener(type, () => window.scrollTo(0, 0)));
  };

  // Any [data-goto="sectionId"] link opens the right tab and scrolls there
  const initGoTo = () => {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('[data-goto]');
      if (!link) return;
      event.preventDefault();
      App.goTo(link.dataset.goto);
    });
  };

  const initTopButton = () => {
    const button = $('#topBtn');

    window.addEventListener('scroll', () => {
      button.classList.toggle('is-visible', window.scrollY > 480);
    }, { passive: true });

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: scrollBehavior });
      $('#main').focus({ preventScroll: true });
    });
  };

  resetScroll();
  App.initTabs();
  App.initProjects();
  App.initCarousel();
  App.initComponents();
  App.initHeroCanvas();
  App.initTheme();
  initGoTo();
  initTopButton();
})();
