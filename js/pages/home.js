const initTvSlider = () => {
  const tvArea = document.querySelector('.hero__tv');
  const tvImg  = document.querySelector('.tv-picture img');
  if (!tvArea || !tvImg) return;

  const slides = [1, 2, 3, 4, 5, 6, 7].map(
    (n) => `assets/images/home/tv-slider/${n}.png`
  );
  const NOISE    = 'assets/images/home/tv-slider/white-noise.png';
  const NOISE_MS = 280;

  let currentIdx = 0;
  let busy       = false;

  const goTo = (idx) => {
    busy = true;
    tvImg.src = NOISE;

    setTimeout(() => {
      tvImg.src  = slides[idx];
      currentIdx = idx;
      busy       = false;
    }, NOISE_MS);
  };

  tvArea.style.cursor = 'pointer';
  tvArea.setAttribute('tabindex', '0');
  tvArea.setAttribute('role', 'button');
  tvArea.setAttribute('aria-label', 'Переключить канал');

  const handleSwitch = () => {
    if (busy) return;
    goTo((currentIdx + 1) % slides.length);
  };

  tvArea.addEventListener('click', handleSwitch);
  tvArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSwitch();
    }
  });
};

const initAfishaCards = () => {
  const container = document.querySelector('.afisha .container');
  if (!container) return;

  const items = [...container.querySelectorAll('.afisha__item')];
  if (items.length < 2) return;

  let frontIdx = 1;

  const applyLayout = () => {
    const backIdx = 1 - frontIdx;
    const svg = items[frontIdx].querySelector('svg');
    if (!svg) return;

    const frontH = svg.getBoundingClientRect().height;
    if (!frontH) return;

    const peek = window.matchMedia('(max-width: 767px)').matches ? 56 : 80;

    container.style.height = `${peek + frontH}px`;

    items[frontIdx].style.top       = `${peek}px`;
    items[frontIdx].style.transform = 'scale(1)';
    items[frontIdx].style.zIndex    = '2';
    items[frontIdx].style.boxShadow = '0 12px 48px rgba(0,0,0,0.3)';
    items[frontIdx].style.cursor    = 'default';

    items[backIdx].style.top       = '0';
    items[backIdx].style.transform = 'scale(0.82)';
    items[backIdx].style.zIndex    = '1';
    items[backIdx].style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
    items[backIdx].style.cursor    = 'pointer';
  };

  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      if (i === frontIdx) return;
      frontIdx = i;
      items[frontIdx].style.zIndex     = '2';
      items[1 - frontIdx].style.zIndex = '1';
      applyLayout();
    });
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      applyLayout();
      requestAnimationFrame(() => {
        items.forEach((item) => item.classList.add('is-animated'));
      });
    });
  });

  window.addEventListener('resize', applyLayout, { passive: true });
};

const initWayAnimation = () => {
  const items = document.querySelectorAll('.way__item');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((item) => observer.observe(item));
};

const initHomePage = () => {
  initTvSlider();
  initAfishaCards();
  initWayAnimation();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomePage);
} else {
  initHomePage();
}
