class MobileMenu {
  constructor() {
    this.menuButton = document.querySelector('.main-nav__btn-menu');
    this.menuList = document.querySelector('.main-nav__list');
    this.overlay = document.createElement('div');
    this.overlay.className = 'menu-overlay';

    this.init();
  }

  init() {
    this.menuButton.addEventListener('click', () => { this.toggleMenu(); });
    document.body.appendChild(this.overlay);
    this.overlay.addEventListener('click', () => { this.closeMenu(); });
  }

  toggleMenu() {
    const isExpanded = this.menuButton.getAttribute('aria-expanded') === 'true';
    this.menuButton.setAttribute('aria-expanded', !isExpanded);
    this.menuList.classList.toggle('is-open');
    this.overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }

  closeMenu() {
    this.menuButton.setAttribute('aria-expanded', 'false');
    this.menuList.classList.remove('is-open');
    this.overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
}


export const initMainMenu = () => {
  new MobileMenu();
  // new MainNav();
//   if (!menu) {
//     return;
//   }

//   window.addEventListener('resize', debounce(resizeHandler, 300));

//   menu.addEventListener('click', menuClickHandler);
}
