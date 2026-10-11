(() => {
  /* EDIT these compliments. Add or remove lines freely. */
  const compliments = [
    'Your laugh makes any room feel lighter.',
    'You handle hard days with more grace than you know.',
    'People trust you, and that is rare.',
    'You make the ordinary days better just by being there.',
    'You are allowed to be proud of how far you have come.',
    'Your kindness is not small. It is remembered.',
    'You are exactly the kind of person others hope to meet.',
    'Your smile is the best part of a long day.',
    'You work hard, and it shows in the way you care.',
    'The world is a little brighter with you in it.'
  ];
  const text = document.getElementById('jarText');
  const btn = document.getElementById('jarBtn');
  let order = [], count = 0;

  btn && btn.addEventListener('click', () => {
    if (!order.length) order = compliments.slice().sort(() => Math.random() - 0.5);
    text.classList.remove('show');
    void text.offsetWidth; // restart the animation
    text.textContent = order.pop();
    text.classList.add('show');
    count++;
    if (count === 3) btn.textContent = 'Another one \u{1F496}';
  });

  document.querySelectorAll('.coupon').forEach((c) =>
    c.addEventListener('click', () => c.classList.toggle('redeemed'))
  );
})();
