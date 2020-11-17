"use strict";

(function () {
  const mainPin = window.map.mainPin;

  mainPin.addEventListener(`mousedown`, window.pins.onMainPinMouseDown);
  mainPin.addEventListener(`keydown`, window.pins.onMainPinEnter);

  const onDataLoad = function (data) {
    window.backend.data = data;
  };

  window.backend.load(onDataLoad, window.popups.showErrorPopup);

})();
