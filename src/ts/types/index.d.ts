export {};

declare global {
  interface Window {
    MSInputMethodContext?: any;
    focusLock: object;
  }

  interface Document {
    documentMode?: number;
  }
}
