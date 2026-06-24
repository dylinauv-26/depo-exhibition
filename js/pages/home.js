const initTvSlider = () => {
  const tv = document.querySelector('.home-hero__tv-widget');
  const slides = document.querySelectorAll('.home-hero__slide');

  if (!tv || !slides.length) {
    return;
  }

  let current = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
  };

  tv.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });
};

const initHomePage = () => {
  initTvSlider();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomePage);
} else {
  initHomePage();
}
