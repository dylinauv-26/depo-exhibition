const loadNotFoundZero = async () => {
  const zero = document.querySelector('[data-zero]');

  if (!zero) {
    return;
  }

  try {
    const response = await fetch(zero.getAttribute('data-zero'));

    if (!response.ok) {
      return;
    }

    zero.innerHTML = await response.text();
  } catch {
    return;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadNotFoundZero);
} else {
  loadNotFoundZero();
}
