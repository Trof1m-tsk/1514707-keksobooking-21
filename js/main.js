"use strict";

(function () {

  const mainPin = window.pin.mainPin;

  mainPin.addEventListener(`click`, window.map.onClickMainPin);
  mainPin.addEventListener(`keydown`, window.map.onEnterMainPin);

})();
