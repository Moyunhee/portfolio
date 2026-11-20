// Main tabs (showcase / portfolio) and cross-tab navigation
(() => {
  const { $, $$, scrollBehavior, createTabs } = window.App;
  let tabs;
  let names = [];

  const initTabs = () => {
    const nav = $('.nav');
    const hero = $('.hero');
    const bar = $('.tabs__bar');
    const buttons = $$('.tabs__tab');
    names = buttons.map((button) => button.dataset.tab);

    const moveBar = (index) => {
      bar.style.width = `${buttons[index].offsetWidth}px`;
      bar.style.transform = `translateX(${buttons[index].offsetLeft}px)`;
    };

    // Keep the sticky tab bar in view after switching
    const keepInView = () => {
      const limit = hero.getBoundingClientRect().bottom + window.scrollY - nav.offsetHeight;
      if (window.scrollY > limit) window.scrollTo(0, limit);
    };

    tabs = createTabs({
      tabs: buttons,
      onChange: (index) => {
        moveBar(index);
        keepInView();
      }
    });

    moveBar(tabs.current);
    window.addEventListener('resize', () => moveBar(tabs.current));
    document.fonts.ready.then(() => moveBar(tabs.current));
  };

  const show = (name) => tabs.select(names.indexOf(name));

  // Jump to any section, opening its tab first
  const goTo = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const panel = section.closest('.tab-panel');
    if (panel) show(panel.dataset.tab);
    requestAnimationFrame(() => section.scrollIntoView({ behavior: scrollBehavior, block: 'start' }));
  };

  Object.assign(window.App, { initTabs, goTo, tabs: { show } });
})();
