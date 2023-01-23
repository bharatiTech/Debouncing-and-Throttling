export default class DebounceAndThrottling {
  constructor() {}

  // debouncing
  debounce(callBackFunction, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callBackFunction(...args);
      }, delay);
    };
  }

  // throttling
  throttling(callBackFunction, delay) {
    let wait = false;
    let waitingArgs = null;

    const timeoutFunc = () => {
      if (waitingArgs == null) {
        wait = false;
      } else {
        callBackFunction(...waitingArgs);
        waitingArgs = null;
        setTimeout(timeoutFunc, delay);
      }
    };

    return (...args) => {
      if (wait) {
        waitingArgs = args;
        return;
      }

      callBackFunction(...args);
      wait = true;

      setTimeout(timeoutFunc, delay);
    };
  }

  // lossless throttling
  losslessTrottling(callBackFunction, delay) {
    let noDelay = true;
    let queue = [];

    const start = () => {
      if (queue.length) {
        const first = queue.shift();
        callBackFunction(first);
        setTimeout(start, delay);
      } else {
        noDelay = true;
      }
    };

    return (...args) => {
      queue.push([...args]);
      if (noDelay) {
        noDelay = false;
        start();
      }
    };
  }
}
