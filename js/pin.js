"use strict";

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pinXOffset = Math.floor(document.querySelector(`.map__pin`).clientWidth / 2);
  const pinYOffset = document.querySelector(`.map__pin`).clientHeight;

  const renderPin = function (offerData) {
    const pinElement = pinTemplate.cloneNode(true);


    const pinImage = pinElement.querySelector(`img`);

    pinElement.style = `left: ${offerData.location.x - pinXOffset}px;
      top: ${offerData.location.y - pinYOffset}px;`;
    pinElement.dataset.pinIndex = ``;
    pinImage.src = offerData.author.avatar;
    pinImage.alt = offerData.offer.title;

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin,
    pinXOffset: pinXOffset,
    pinYOffset: pinYOffset
  };

})();
