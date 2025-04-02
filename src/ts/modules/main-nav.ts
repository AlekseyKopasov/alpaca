import { debounce } from "../utils/debounce";

const TABLET_DISPLAY_WIDTH = 'max-width: 1024px';

const menu = document.querySelector('.main-nav');

function resizeHandler() {
  const isTablet = window.matchMedia(`(${TABLET_DISPLAY_WIDTH})`).matches;

  if (isTablet && menu) {
    menu.classList.add('is-tablet');

  } else if (!isTablet && menu) {
    menu.classList.remove('is-tablet');
  }
}

function menuClickHandler(evt: Event) {
  evt.preventDefault();

  const target = evt.target as HTMLElement;
  const dropdownItem = target.closest('.has-dropdown') || target.parentElement!.closest('.has-dropdown');

  if (dropdownItem) {
    const innerList = dropdownItem.querySelector('.main-nav__inner-list');
    // menu?.querySelector('.is-open')?.classList.remove('is-open');
    innerList?.classList.toggle('is-open');
  }

  // if (menu.classList.contains('is-open')) {
  //   menu.classList.remove('is-open');
  // } else {
  //   menu.classList.add('is-open');
  // }
}

export const initMainMenu = () => {
  if (!menu) {
    return;
  }

  window.addEventListener('resize', debounce(resizeHandler, 300));

  menu.addEventListener('click', menuClickHandler);
}
