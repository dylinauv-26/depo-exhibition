const initBookGallery = () => {
  const spread = document.querySelector('.book__spread');
  const thumbs = document.querySelectorAll('.book__thumb');

  if (!spread || !thumbs.length) {
    return;
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const src = thumb.dataset.src;
      const alt = thumb.dataset.alt;

      if (!src) {
        return;
      }

      spread.src = src;

      if (alt) {
        spread.alt = alt;
      }

      thumbs.forEach((item) => item.classList.remove('book__thumb--active'));
      thumb.classList.add('book__thumb--active');
    });
  });
};

const initBookAutoScroll = () => {
  const track = document.querySelector('.book__track');

  if (!track) {
    return;
  }

  let paused = false;
  let lastTime = null;
  const speed = 0.04;

  const tick = (timestamp) => {
    if (!paused) {
      if (lastTime !== null) {
        const delta = timestamp - lastTime;
        track.scrollLeft += speed * delta;

        if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
          track.scrollLeft = 0;
        }
      }

      lastTime = timestamp;
    } else {
      lastTime = null;
    }

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);

  track.addEventListener('mouseenter', () => { paused = true; });
  track.addEventListener('mouseleave', () => { paused = false; });
  track.addEventListener('touchstart', () => { paused = true; }, { passive: true });
  track.addEventListener('touchend', () => { paused = false; });
};

const initBookPage = () => {
  initBookGallery();
  initBookAutoScroll();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBookPage);
} else {
  initBookPage();
}
