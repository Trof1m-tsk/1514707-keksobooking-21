"use strict";

(function () {

  const mainPin = window.pin.mainPin;
  const unblockMap = window.map.unblockMap;

  mainPin.addEventListener(`click`, window.map.onClickMainPin);
  mainPin.addEventListener(`keydown`, window.map.onEnterMainPin);

  window.map.renderPinsOnMap(window.data.offersList);


})();
