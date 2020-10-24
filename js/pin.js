"use strict";

(function () {

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const pinsList = document.querySelector(`.map__pins`);
  const pinXOffset = Math.floor(mainPin.clientWidth / 2);
  const pinYOffset = mainPin.clientHeight;

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

  const getPinCoords = function () {
    const pinCoodrs = {
      x: mainPin.offsetLeft + pinXOffset,
      y: mainPin.offsetTop + pinXOffset
    };

    if (pinCoodrs.x < 0) {
      pinCoodrs.x = 0;
    } else if (pinCoodrs.x > pinsList.clientWidth) {
      pinCoodrs.x =  pinsList.clientWidth;
    }

     if (pinCoodrs.y < 0) {
      pinCoodrs.y = 0;
    } else if (pinCoodrs.y > pinsList.clientHeight) {
      pinCoodrs.y =  pinsList.clientHeight;
    }

    return `${pinCoodrs.x}, ${pinCoodrs.y}`;
  };

  const dragPin = function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    console.log(`mouse down inside`);

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener(`click`, onClickPreventDefault);
        };
        mainPin.addEventListener(`click`, onClickPreventDefault);
      }

      console.log(`mouse move`);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      pinsList.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      console.log(`mouse up`);
    };

    pinsList.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.pin = {
    mainPin: mainPin,
    pinsList: pinsList,
    renderPin: renderPin,
    getPinCoords: getPinCoords,
    dragPin: dragPin
  };

})();
