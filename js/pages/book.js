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

const initBookPage = () => {
  initBookGallery();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBookPage);
} else {
  initBookPage();
}
