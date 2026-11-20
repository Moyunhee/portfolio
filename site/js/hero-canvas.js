// Interactive dot-grid background for the hero
(() => {
  const { $, root, prefersReducedMotion } = window.App;

  const initHeroCanvas = () => {
    const hero = $('.hero');
    const canvas = $('#heroCanvas');
    const ctx = canvas.getContext('2d');

    const GAP = 26;
    const RADIUS = 140;
    const target = { x: 0, y: 0, active: false };
    const cursor = { x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let colors = {};
    let frameId = 0;

    const toRgb = (hex) => {
      const value = hex.trim().replace('#', '');
      return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)).join(',');
    };

    const draw = (time) => {
      const t = time * 0.001;

      // Follow the pointer, or drift on its own when idle
      const goalX = target.active ? target.x : width * (0.5 + 0.35 * Math.sin(t * 0.5));
      const goalY = target.active ? target.y : height * (0.5 + 0.3 * Math.sin(t * 0.7 + 1));
      cursor.x += (goalX - cursor.x) * 0.1;
      cursor.y += (goalY - cursor.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, RADIUS * 1.7);
      glow.addColorStop(0, `rgba(${colors.primary},0.16)`);
      glow.addColorStop(1, `rgba(${colors.primary},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          const dx = x - cursor.x;
          const dy = y - cursor.y;
          const dist = Math.hypot(dx, dy);
          const near = Math.max(0, 1 - dist / RADIUS);
          const wave = 0.5 + 0.5 * Math.sin((x + y) * 0.012 - t * 1.2);
          const push = near * near * 10;
          const offsetX = dist ? (dx / dist) * push : 0;
          const offsetY = dist ? (dy / dist) * push : 0;

          ctx.fillStyle = near > 0.02
            ? `rgba(${colors.primary},${(0.25 + near * 0.6).toFixed(2)})`
            : `rgba(${colors.muted},${(0.12 + wave * 0.18).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, 1.2 + wave * 0.8 + near * near * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const readColors = () => {
      const style = getComputedStyle(root);
      colors = {
        primary: toRgb(style.getPropertyValue('--color-primary')),
        muted: toRgb(style.getPropertyValue('--color-muted'))
      };
      if (prefersReducedMotion) draw(0);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.clientWidth;
      height = hero.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (prefersReducedMotion) draw(0);
    };

    const loop = (time) => {
      draw(time);
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!frameId) frameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    resize();
    readColors();
    new ResizeObserver(resize).observe(hero);
    new MutationObserver(readColors).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    if (prefersReducedMotion) return;

    draw(0);
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
      target.active = true;
    });
    hero.addEventListener('pointerleave', () => { target.active = false; });

    // Animate only while visible
    new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop())).observe(hero);
  };

  window.App.initHeroCanvas = initHeroCanvas;
})();
