const TOY_CONFIG = [
  { selector: '.contacts__toy--horse', delay: 0, duration: 9, drift: -6 },
  { selector: '.contacts__toy--block', delay: 1.2, duration: 10, drift: 8 },
  { selector: '.contacts__toy--duck', delay: 2.4, duration: 8.5, drift: -10 },
  { selector: '.contacts__toy--plane', delay: 0.6, duration: 11, drift: 12 },
  { selector: '.contacts__toy--car', delay: 3, duration: 9.5, drift: -14 },
  { selector: '.contacts__toy--bear', delay: 1.8, duration: 10.5, drift: 6 },
];

const loadToySvgs = async () => {
  const toys = document.querySelectorAll('[data-toy]');

  await Promise.all(
    [...toys].map(async (toy) => {
      const src = toy.getAttribute('data-toy');

      if (!src) {
        return;
      }

      try {
        const response = await fetch(src);

        if (!response.ok) {
          return;
        }

        toy.innerHTML = await response.text();
      } catch {
        return;
      }
    }),
  );
};

const initContactsToys = () => {
  TOY_CONFIG.forEach(({ selector, delay, duration, drift }) => {
    const toy = document.querySelector(selector);

    if (!toy) {
      return;
    }

    toy.style.setProperty('--fall-delay', `${delay}s`);
    toy.style.setProperty('--fall-duration', `${duration}s`);
    toy.style.setProperty('--fall-drift', `${drift}px`);
  });
};

const initContactsPage = async () => {
  await loadToySvgs();
  initContactsToys();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactsPage);
} else {
  initContactsPage();
}
