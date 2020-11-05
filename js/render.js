"use strict";

(function () {

  let PINS_ON_MAP = 5;

  const pinsList = window.pin.pinsList;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const getFilteredData = function (houseingType) {
    return window.backend.data.filter(function (item) {
      return item.offer.type === houseingType;
    });
  };

  const renderPin = function (offerData) {
    const pinElement = pinTemplate.cloneNode(true);
    const pinImage = pinElement.querySelector(`img`);

    pinElement.style = `left: ${offerData.location.x - window.pin.pinXOffset}px;
      top: ${offerData.location.y - window.pin.pinYOffset}px;`;
    pinElement.dataset.pinIndex = ``;
    pinImage.src = offerData.author.avatar;
    pinImage.alt = offerData.offer.title;

    return pinElement;
  };

  const renderPinsOnMap = function (dataArray) {
    const pinsFragment = document.createDocumentFragment();
    let leng = PINS_ON_MAP;

    if (dataArray.length < PINS_ON_MAP) {
      leng = dataArray.length;
    }

    for (let i = 0; i < leng; i++) {
      const pin = renderPin(dataArray[i]);
      pin.dataset.pinIndex = i;
      pin.tabindex = i + 1;
      pinsFragment.appendChild(pin);
    }

    pinsList.appendChild(pinsFragment);
  };

  window.render = {
    renderPinsOnMap: renderPinsOnMap,
    getFilteredData: getFilteredData
  };

})();
