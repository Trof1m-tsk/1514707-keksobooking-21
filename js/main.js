"use strict";

(function () {
  const mainPin = window.map.mainPin;

  mainPin.addEventListener(`mousedown`, window.pins.onMainPinMouseDown);
  mainPin.addEventListener(`keydown`, window.pins.onMainPinPressEnter);

  const onDataLoad = function (data) {
    window.backend.data = data;
  };

  window.backend.load(onDataLoad, window.popups.showErrorPopup);

})();
