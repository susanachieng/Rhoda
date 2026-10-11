(() => {
  const $ = (s) => document.querySelector(s);
  const music = $('#music'), musicBtn = $('#musicBtn');
  const welcome = $('#welcome'), site = $('#site');
  const candles = [...document.querySelectorAll('.candle')];
  const finale = $('#finale'), hint = $('#cakeHint');

  /* ---------- Open the surprise ---------- */
  $('#openBtn').addEventListener('click', () => {
    welcome.hidden = true;
    site.hidden = false;
    musicBtn.hidden = false;
    window.scrollTo(0, 0);
    music.volume = 0.5;
    music.play().then(() => setMusicLabel(true)).catch(() => setMusicLabel(false));
  });

  /* ---------- Music toggle ---------- */
  function setMusicLabel(on) { musicBtn.textContent = on ? '♪ Music on' : '♪ Music off'; }
  musicBtn.addEventListener('click', () => {
    if (music.paused) { music.play().catch(() => {}); setMusicLabel(true); }
    else { music.pause(); setMusicLabel(false); }
  });

  /* ---------- Photos: friendly placeholder if a file is missing ---------- */
  document.querySelectorAll('.photo img').forEach((img) => {
    img.addEventListener('error', () => {
      const box = document.createElement('div');
      box.className = 'ph';
      box.textContent = 'Add ' + img.dataset.name + ' to assets/photos/';
      img.replaceWith(box);
    });
  });

  /* ---------- Cake ---------- */
  function checkCandles() {
    if (candles.every((c) => c.classList.contains('out'))) {
      hint.textContent = 'Your wish has been made.';
      finale.hidden = false;
      finale.scrollIntoView({ behavior: 'smooth', block: 'center' });
      launchConfetti();
    }
  }
  candles.forEach((c) => c.addEventListener('click', () => {
    c.classList.add('out');
    checkCandles();
  }));
  $('#againBtn').addEventListener('click', () => {
    candles.forEach((c) => c.classList.remove('out'));
    finale.hidden = true;
    hint.textContent = 'Tap the candles, close your eyes, and make a wish.';
  });

  /* ---------- Confetti ---------- */
  const canvas = $('#confetti'), ctx = canvas.getContext('2d');
  let pieces = [], running = false;
  const colors = ['#ff5c9a', '#ffb3cf', '#ffc857', '#e0306f', '#ffffff', '#c77dff'];

  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  addEventListener('resize', resize); resize();

  function launchConfetti() {
    for (let i = 0; i < 160; i++) {
      pieces.push({
        x: Math.random() * canvas.width, y: -20 - Math.random() * canvas.height * 0.5,
        w: 6 + Math.random() * 6, h: 8 + Math.random() * 8,
        vx: -1.5 + Math.random() * 3, vy: 2 + Math.random() * 3.5,
        rot: Math.random() * 6, vr: -0.15 + Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    if (!running) { running = true; requestAnimationFrame(tick); }
  }
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    pieces = pieces.filter((p) => p.y < canvas.height + 30);
    if (pieces.length) requestAnimationFrame(tick);
    else { running = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }
})();
