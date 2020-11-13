"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const blockMap = function () {
    map.classList.add(`map--faded`);
    window.pins.putListenersOnBlockMap();
    window.form.putListenersOnBlockMap();
    window.filters.removeFiltersListeners();
  };

  const unblockMap = function () {
    map.classList.remove(`map--faded`);
    window.pins.putListenersOnUnblockMap();
    window.form.putListenersOnUnblockMap();
    window.filters.addFiltersListeners();
  };

  window.map = {
    map: map,
    mainPin: mainPin,
    blockMap: blockMap,
    unblockMap: unblockMap
  };

})();
