import { initHeader } from './components/header.js';
import { initFooter } from './components/footer.js';

const resolveBasePath = () => {
  const htmlBase = document.documentElement.dataset.base;

  if (htmlBase) {
    return htmlBase.endsWith('/') ? htmlBase : `${htmlBase}/`;
  }

  return window.location.pathname.includes('/pages/') ? '../' : './';
};

const resolveComponentUrl = (fileName) => {
  return new URL(`../html-components/${fileName}`, import.meta.url).href;
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

const showLayoutError = (headerHost, footerHost) => {
  const message =
    'Header и footer не загрузились. Откройте сайт через локальный сервер: npx serve .';

  if (headerHost) {
    headerHost.innerHTML = `<p class="layout-error">${message}</p>`;
  }

  if (footerHost) {
    footerHost.innerHTML = '';
  }
};

const initLayout = async () => {
  const basePath = resolveBasePath();
  const headerHost = document.getElementById('site-header');
  const footerHost = document.getElementById('site-footer');

  if (!headerHost || !footerHost) {
    return;
  }

  if (window.location.protocol === 'file:') {
    showLayoutError(headerHost, footerHost);
    return;
  }

  try {
    const [headerResponse, footerResponse] = await Promise.all([
      fetch(resolveComponentUrl('header.html')),
      fetch(resolveComponentUrl('footer.html')),
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
    showLayoutError(headerHost, footerHost);
  }
};

initLayout();
