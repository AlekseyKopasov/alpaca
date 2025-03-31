export {};

declare global {
  interface Window {
    MSInputMethodContext?: any;
    modals: object;
    focusLock: object;
    form: object;
    selectInit: object;
    Swiper: object;
    tippy?: any;
  }

  interface Document {
    documentMode?: number;
  }
}

// export declare module 'accordion-js';
