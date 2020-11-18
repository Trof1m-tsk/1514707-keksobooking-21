"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const blockMap = function () {
    map.classList.add(`map--faded`);
    window.form.blockFields();
    window.pins.putListenersOnBlockMap();
    window.form.putListenersOnBlockMap();
    window.filters.removeFiltersListeners();
    window.filters.block();
  };

  const unblockMap = function () {
    map.classList.remove(`map--faded`);
    window.form.unblockFields();
    window.pins.putListenersOnUnblockMap();
    window.form.putListenersOnUnblockMap();
    window.filters.addFiltersListeners();
    window.filters.unblock();
  };

  window.map = {
    mainPin,
    blockMap,
    unblockMap
  };

})();
