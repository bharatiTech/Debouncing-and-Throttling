export default class DebounceAndThrottling {
  constructor() {}

  // debouncing
  debounce(callBackFunction, delayDuration) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callBackFunction(...args);
      }, delayDuration);
    };
  }

  // throttling
  throttling(callBackFunction, delayDuration) {
    let wait = false;
    let waitingArgs = null;

    const timeoutFunc = () => {
      if (waitingArgs == null) {
        wait = false;
      } else {
        callBackFunction(...waitingArgs);
        waitingArgs = null;
        setTimeout(timeoutFunc, delayDuration);
      }
    };

    return (...args) => {
      if (wait) {
        waitingArgs = args;
        return;
      }

      callBackFunction(...args);
      wait = true;

      setTimeout(timeoutFunc, delayDuration);
    };
  }
}
