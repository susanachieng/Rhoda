(() => {
  const layer = document.getElementById('balloons');
  if (!layer || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#ff5c9a', '#ff8fb8', '#ffb3cf', '#f23c7e', '#ffc857', '#c77dff', '#ff7aa8'];
  const count = innerWidth < 600 ? 9 : 16;

  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    const size = 46 + Math.random() * 38;
    b.className = 'balloon';
    b.style.cssText =
      `--c:${colors[i % colors.length]};--s:${size}px;` +
      `left:${Math.random() * 94}%;` +
      `animation-duration:${14 + Math.random() * 14}s;` +
      `animation-delay:-${Math.random() * 24}s;`;
    // Tap a balloon to pop it; it floats back up a moment later
    b.addEventListener('click', () => {
      b.classList.add('pop');
      setTimeout(() => b.classList.remove('pop'), 1800);
    });
    layer.appendChild(b);
  }
})();
