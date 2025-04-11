import './types/index.d.ts';

import './vendor';

import { initMainMenu } from './modules/main-nav.js';
import { mobileVhFix } from './utils/mobile-vh-fix';

// ---------------------------------
window.addEventListener('DOMContentLoaded', () => {
  // Utils
  // ---------------------------------
  mobileVhFix();

  // Modules
  // ---------------------------------
  window.addEventListener('load', () => {
    initMainMenu();
  });
});
