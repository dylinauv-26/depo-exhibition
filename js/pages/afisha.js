const initAfishaModal = () => {
  const modal = document.getElementById('afisha-signup-modal');

  if (!modal) {
    return;
  }

  const overlay = modal.querySelector('[data-close]');
  const closeButton = modal.querySelector('.afisha-modal__close');
  const eventLine = modal.querySelector('[data-event-info]');
  const form = modal.querySelector('.afisha-modal__form');
  const firstField = modal.querySelector('.afisha-modal__input');

  const handleClose = () => {
    modal.hidden = true;
    document.body.classList.remove('is-menu-locked');
  };

  const handleOpen = (card) => {
    const title = card.dataset.eventTitle ?? '';
    const date = card.dataset.eventDate ?? '';

    if (eventLine) {
      eventLine.textContent = `${title} — ${date}`;
    }

    modal.hidden = false;
    document.body.classList.add('is-menu-locked');
    firstField?.focus();
  };

  document.querySelectorAll('.afisha-card').forEach((card) => {
    if (card.hasAttribute('href')) return;
    card.addEventListener('click', () => handleOpen(card));
  });

  overlay?.addEventListener('click', handleClose);
  closeButton?.addEventListener('click', handleClose);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      handleClose();
    }
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const signup = {
      event: eventLine?.textContent?.trim() ?? '',
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
    };

    console.log('Запись на мероприятие:', signup);
    form.reset();
    handleClose();
  });
};

const initAfishaPage = () => {
  initAfishaModal();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAfishaPage);
} else {
  initAfishaPage();
}
