(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const layer = document.createElement('div');
  layer.className = 'fx';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);
  const small = innerWidth < 600;
  const rand = (a, b) => a + Math.random() * (b - a);
  const tints = ['#ff5c9a', '#e0306f', '#ff8fb8', '#ffffff', '#ffc857'];

  /* Falling hearts */
  for (let i = 0; i < (small ? 12 : 22); i++) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = '\u2665';
    h.style.cssText =
      `left:${rand(0, 98)}%;font-size:${rand(12, 28)}px;color:${tints[i % tints.length]};` +
      `animation-duration:${rand(9, 18)}s,${rand(2.5, 4.5)}s;animation-delay:-${rand(0, 18)}s,0s;`;
    layer.appendChild(h);
  }

  /* Twinkling sparkles */
  for (let i = 0; i < (small ? 14 : 28); i++) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = '\u2726';
    s.style.cssText =
      `left:${rand(0, 98)}%;top:${rand(0, 96)}%;font-size:${rand(10, 22)}px;` +
      `animation-duration:${rand(1.8, 4)}s;animation-delay:-${rand(0, 4)}s;`;
    layer.appendChild(s);
  }

  /* Sparkle burst wherever she taps */
  addEventListener('pointerdown', (e) => {
    for (let i = 0; i < 7; i++) {
      const b = document.createElement('span');
      const a = (Math.PI * 2 * i) / 7, d = rand(30, 70);
      b.className = 'burst';
      b.textContent = i % 2 ? '\u2726' : '\u2665';
      b.style.cssText =
        `left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;` +
        `color:${tints[i % tints.length]};`;
      layer.appendChild(b);
      setTimeout(() => b.remove(), 800);
    }
  });
})();
