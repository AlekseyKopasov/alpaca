import scrollLock, { type ScrollableTarget } from 'scroll-lock';

class MobileMenu {
  private static readonly SELECTORS = {
    DROPDOWN: '.has-dropdown',
    INNER_LIST: '.main-nav__inner-list',
    OPEN: '.is-open',
    ACTIVE: '.is-active',
  };

  _scrollLock: {
    disablePageScroll: (scrollableTarget?: ScrollableTarget) => void;
    enablePageScroll: (scrollableTarget?: ScrollableTarget) => void;
  };

  private static readonly MOBILE_BREAKPOINT = 1024;
  private static instance: MobileMenu | null = null;
  private static resizeTimeout: number | null = null;

  private readonly menuButton: HTMLElement | null;
  private readonly menuList: HTMLElement | null;
  private readonly overlay: HTMLDivElement;

  private constructor() {
    this._scrollLock = scrollLock;
    this.menuButton = document.querySelector('.main-nav__btn-menu');
    this.menuList = document.querySelector('.main-nav__list');
    this.overlay = document.createElement('div');
    this.overlay.className = 'menu-overlay';

    this.init();
  }

  private init(): void {
    if (!this.menuButton || !this.menuList) {
      return;
    }

    this.menuButton.setAttribute('aria-expanded', 'false');
    this.menuButton.addEventListener('click', () => {
      this.toggleMenu();
    });
    document.body.appendChild(this.overlay);
    this.overlay.addEventListener('click', () => {
      this.closeMenu();
    });
    this.menuList.addEventListener('click', evt => {
      this.toggleItem(evt);
    });
  }

  private toggleMenu(): void {
    if (!this.menuButton || !this.menuList) {
      return;
    }

    const isExpanded = this.menuButton.getAttribute('aria-expanded') === 'true';
    this.menuButton.setAttribute('aria-expanded', String(!isExpanded));
    this.menuList.classList.toggle('is-open');
    this.overlay.classList.toggle('active');

    if (this.menuList.classList.contains('is-open')) {
      this._scrollLock.disablePageScroll(document.body);
    } else {
      this._scrollLock.enablePageScroll(document.body);
    }

    if (!this.menuList.classList.contains('is-open')) {
      this.closeAllSubmenus();
    }
  }

  private toggleItem(evt: MouseEvent): void {
    const target = evt.target as HTMLElement;
    const item =
      target.closest(MobileMenu.SELECTORS.DROPDOWN) || target.parentElement?.closest(MobileMenu.SELECTORS.DROPDOWN);

    item?.querySelector(MobileMenu.SELECTORS.INNER_LIST)?.classList.toggle('is-open');
    item?.classList.toggle('is-open');
  }

  private closeAllSubmenus(): void {
    this.menuList?.querySelectorAll(`${MobileMenu.SELECTORS.DROPDOWN}${MobileMenu.SELECTORS.OPEN}`).forEach(item => {
      item.classList.remove('is-open');
      item.querySelector(MobileMenu.SELECTORS.INNER_LIST)?.classList.remove('is-open');
    });
  }

  private closeMenu(): void {
    if (!this.menuButton || !this.menuList) {
      return;
    }

    this.menuButton.setAttribute('aria-expanded', 'false');
    this.menuList.classList.remove('is-open');
    this.overlay.classList.remove('active');
    this._scrollLock.enablePageScroll(document.body);
    this.closeAllSubmenus();
  }

  private destroy(): void {
    if (!this.menuButton || !this.menuList) {
      return;
    }

    this.closeMenu();
    this.menuButton.removeEventListener('click', () => {
      this.toggleMenu();
    });
    this.overlay.removeEventListener('click', () => {
      this.closeMenu();
    });
    this.menuList.removeEventListener('click', evt => {
      this.toggleItem(evt);
    });
    this.overlay.remove();
  }

  private static handleResize(): void {
    const isMobile = window.innerWidth < MobileMenu.MOBILE_BREAKPOINT;
    const elementsExist = document.querySelector('.main-nav__btn-menu') && document.querySelector('.main-nav__list');

    if (isMobile && elementsExist) {
      if (!MobileMenu.instance) {
        MobileMenu.instance = new MobileMenu();
      }
    } else {
      if (MobileMenu.instance) {
        MobileMenu.instance.destroy();
        MobileMenu.instance = null;
      }
    }
  }

  public static init(): void {
    // Первоначальная проверка
    MobileMenu.handleResize();

    // Обработчик ресайза
    window.addEventListener('resize', () => {
      if (MobileMenu.resizeTimeout) {
        clearTimeout(MobileMenu.resizeTimeout);
      }
      MobileMenu.resizeTimeout = window.setTimeout(() => {
        MobileMenu.handleResize();
      }, 100);
    });
  }
}

export const initMainMenu = () => {
  MobileMenu.init();
};
