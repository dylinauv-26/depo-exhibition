import { initHeader } from './components/header.js';
import { initFooter } from './components/footer.js';

const resolveBasePath = () => {
  const htmlBase = document.documentElement.dataset.base;

  if (htmlBase) {
    return htmlBase.endsWith('/') ? htmlBase : `${htmlBase}/`;
  }

  return window.location.pathname.includes('/pages/') ? '../' : './';
};

const applyLinks = (root, basePath) => {
  root.querySelectorAll('[data-link]').forEach((element) => {
    const linkPath = element.getAttribute('data-link');

    if (!linkPath) {
      return;
    }

    element.setAttribute('href', `${basePath}${linkPath}`);
  });
};

const initLayout = async () => {
  const basePath = resolveBasePath();
  const headerHost = document.getElementById('site-header');
  const footerHost = document.getElementById('site-footer');

  if (!headerHost || !footerHost) {
    return;
  }

  try {
    const [headerResponse, footerResponse] = await Promise.all([
      fetch(`${basePath}components/header.html`),
      fetch(`${basePath}components/footer.html`),
    ]);

    if (!headerResponse.ok || !footerResponse.ok) {
      throw new Error('Не удалось загрузить header или footer');
    }

    const [headerHtml, footerHtml] = await Promise.all([
      headerResponse.text(),
      footerResponse.text(),
    ]);

    headerHost.innerHTML = headerHtml;
    footerHost.innerHTML = footerHtml;

    applyLinks(headerHost, basePath);
    applyLinks(footerHost, basePath);

    initHeader();
    initFooter();
  } catch (error) {
    console.error(error);
  }
};

initLayout();
