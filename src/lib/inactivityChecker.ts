let inactivityTimeout: ReturnType<typeof setTimeout> | null = null;
const timeout = 600000;

export const refreshTimer = (cb: () => void): void => {
  if (inactivityTimeout) clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(cb, timeout);
};

let savedCb: () => void;
const events = ['click', 'mousemove', 'mousedown', 'keydown', 'focus', 'touchmove'];

export const onInactive = (cb: () => void, isListenActivity?: boolean): void => {
  if (isListenActivity) {
    savedCb = (): void => {
      refreshTimer(cb);
    };
    events.forEach((event) => {
      document.addEventListener(event, savedCb);
    });
  } else {
    events.forEach((event) => {
      document.removeEventListener(event, savedCb);
    });
  }
};
