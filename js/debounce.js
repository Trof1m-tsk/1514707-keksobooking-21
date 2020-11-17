"use strict";

(function () {
  const DEBOUNCE_TIME = 500;

  window.createDebounce = function (callback) {
    let activeTimeout;

    return function () {
      if (activeTimeout) {
        window.clearTimeout(activeTimeout);
      }

      activeTimeout = window.setTimeout(function () {
        callback();
      }, DEBOUNCE_TIME);
    };
  };

})();
