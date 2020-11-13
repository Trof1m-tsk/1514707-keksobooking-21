"use strict";

(function () {
  const main = document.querySelector(`main`);
  const mainPin = window.map.mainPin;

  mainPin.addEventListener(`click`, window.map.onClickMainPin);
  mainPin.addEventListener(`keydown`, window.map.onEnterMainPin);

  const onDataLoad = function (data) {
    window.backend.data = data;
    window.pins.renderPinsOnMap(data);
  };

  window.backend.load(onDataLoad, window.popups.showErrorPopup);

})();
