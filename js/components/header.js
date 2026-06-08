export const initHeader = () => {
  const header = document.querySelector('.header');

  if (!header) {
    return;
  }

  const burger = header.querySelector('.header__burger');
  const mobileMenu = header.querySelector('.header__mobile-menu');
  const pageName = document.body.dataset.page || '';
  const menuLinks = header.querySelectorAll('[data-nav]');

  menuLinks.forEach((link) => {
    const isActive = link.dataset.nav === pageName;
    link.classList.toggle('is-active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
      return;
    }

    link.removeAttribute('aria-current');
  });

  if (!burger || !mobileMenu) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove('is-menu-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-menu-locked');
  };

  const openMenu = () => {
    header.classList.add('is-menu-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-menu-locked');
  };

  const toggleMenu = () => {
    if (header.classList.contains('is-menu-open')) {
      closeMenu();
      return;
    }

    openMenu();
  };

  burger.addEventListener('click', toggleMenu);

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
};
