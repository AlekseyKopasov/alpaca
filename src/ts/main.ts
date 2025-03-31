import './types/index.d.ts';

import './vendor';

// import { initCustomSelect } from './modules/select/init-select';
import { mobileVhFix } from './utils/mobile-vh-fix';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  // Utils
  // ---------------------------------

  mobileVhFix();

  // Modules
  // ---------------------------------
  window.addEventListener('load', () => {
    // initCustomSelect();
  });
});
