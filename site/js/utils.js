window.App = (() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const root = document.documentElement;
  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  // ARIA tabs: roving tabindex, arrow keys, optional lock via canSelect
  const createTabs = ({ tabs, canSelect = () => true, onChange = () => {} }) => {
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));
    let current = Math.max(0, tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'));

    const apply = (index) => {
      current = index;
      tabs.forEach((tab, i) => {
        const isActive = i === index;
        tab.setAttribute('aria-selected', isActive);
        tab.tabIndex = isActive ? 0 : -1;
        tab.classList.toggle('is-active', isActive);
        panels[i].hidden = !isActive;
      });
    };

    const select = (index, { focus = false } = {}) => {
      if (!canSelect(index)) return false;
      apply(index);
      if (focus) tabs[index].focus();
      onChange(index);
      return true;
    };

    tabs.forEach((tab, index) => tab.addEventListener('click', () => select(index)));

    tabs[0].parentElement.addEventListener('keydown', (event) => {
      const steps = { ArrowRight: 1, ArrowLeft: -1 };
      const count = tabs.length;
      let candidates;

      if (event.key === 'Home') candidates = [...tabs.keys()];
      else if (event.key === 'End') candidates = [...tabs.keys()].reverse();
      else if (event.key in steps) {
        candidates = Array.from({ length: count - 1 }, (_, i) => (current + steps[event.key] * (i + 1) + count * count) % count);
      } else return;

      event.preventDefault();
      const next = candidates.find(canSelect);
      if (next !== undefined) select(next, { focus: true });
    });

    apply(current);

    return {
      select,
      get current() {
        return current;
      }
    };
  };

  return { $, $$, root, prefersReducedMotion, scrollBehavior, createTabs };
})();
