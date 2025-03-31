export const debounce = (callback: any, wait: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: []) => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};
