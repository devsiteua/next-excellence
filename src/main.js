function initHeaderMenu() {
  const openButton = document.querySelector('[data-menu-open]');
  const closeButton = document.querySelector('[data-menu-close]');
  const menu = document.querySelector('[data-menu]');
  const backdrop = document.querySelector('[data-menu-backdrop]');

  if (!openButton || !closeButton || !menu || !backdrop) return;

  const desktopMedia = window.matchMedia('(min-width: 1280px)');
  const focusableSelector =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let isOpen = false;

  const setMenuState = (open, { returnFocus = true } = {}) => {
    isOpen = open;
    menu.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    backdrop.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    openButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);

    if (open) {
      closeButton.focus();
    } else if (returnFocus) {
      openButton.focus();
    }
  };

  const closeMenu = options => {
    if (isOpen) setMenuState(false, options);
  };

  const handleKeydown = event => {
    if (!isOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = [
      ...menu.querySelectorAll(focusableSelector),
    ].filter(element => !element.hasAttribute('disabled'));
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (!firstElement || !lastElement) return;

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handleDesktopChange = event => {
    if (event.matches) closeMenu({ returnFocus: false });
  };

  menu.inert = true;
  openButton.addEventListener('click', () => setMenuState(true));
  closeButton.addEventListener('click', () => closeMenu());
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) closeMenu();
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a[href^="#"]')) {
      closeMenu({ returnFocus: false });
    }
  });
  document.addEventListener('keydown', handleKeydown);
  desktopMedia.addEventListener('change', handleDesktopChange);
}

initHeaderMenu();
