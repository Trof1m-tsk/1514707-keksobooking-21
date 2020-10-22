"use strict";

(function () {
  const pinsList = document.querySelector(`.map__pins`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const renderPinsOnMap = function (dataArray) {
    const pinsFragment = document.createDocumentFragment();

    dataArray.forEach(function (el, index) {
      const pin = window.pin.renderPin(el);
      pin.dataset.pinIndex = index;
      pin.tabindex = index + 1;
      pinsFragment.appendChild(pin);
    });
    pinsList.appendChild(pinsFragment);
  };

  const pinCoords = function (pinElement) {
    return `${pinElement.offsetLeft + window.pin.pinXOffset}, ${pinElement.offsetTop + window.pin.pinXOffset}`;
  };

  window.map = {
    mainPin: mainPin,
    renderPinsOnMap: renderPinsOnMap,
    pinCoords: pinCoords
  };

})();
