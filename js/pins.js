"use strict";

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mainPin =  window.map.mainPin;
  const pinsList = window.map.pinsList;
  const pinXOffset = Math.floor(mainPin.clientWidth / 2);
  const pinYOffset = mainPin.clientHeight;

  const getPinCoords = function () {
    const pinCoodrs = {
      x: mainPin.offsetLeft + pinXOffset,
      y: mainPin.offsetTop + pinXOffset
    };

    if (pinCoodrs.x < 0) {
      pinCoodrs.x = 0;
    } else if (pinCoodrs.x > pinsList.clientWidth) {
      pinCoodrs.x = pinsList.clientWidth;
    }

    if (pinCoodrs.y < 0) {
      pinCoodrs.y = 0;
    } else if (pinCoodrs.y > pinsList.clientHeight) {
      pinCoodrs.y = pinsList.clientHeight;
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
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      pinsList.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    pinsList.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

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

  const renderPinsOnMap = function (dataArray) {
    const pinsFragment = document.createDocumentFragment();

    const slicedDataArray = dataArray.slice(0, 5);
    slicedDataArray.forEach(function (dataItem, index) {
      const pin = renderPin(dataItem);
      pin.dataset.pinIndex = index;
      pin.tabindex = index + 1;
      pinsFragment.appendChild(pin);
    });

    pinsList.appendChild(pinsFragment);
  };

  const onClickPin = function (evt) {
    if (evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
      window.card.createCard(window.filters.filterData()[evt.target.closest(`.map__pin`).dataset.pinIndex]);
    }
  };

  const onEnterActivePin = function (evt) {
    if (evt.key === `Enter` && !evt.target.closest(`.map__pin--main`)) {
      window.card.createCard(window.filters.filterData()[evt.target.closest(`.map__pin`).dataset.pinIndex]);
    }
  };

  const putListenersOnBlockMap = function () {
    pinsList.removeEventListener(`mousedown`, onClickPin);
    pinsList.removeEventListener(`keydown`, onEnterActivePin);
    mainPin.addEventListener(`click`, window.map.onClickMainPin);
    mainPin.addEventListener(`keydown`, window.map.onEnterMainPin);
    mainPin.removeEventListener(`mousedown`, window.map.onMouseDownMainPin);
  };

  const putListenersOnUnblockMap = function () {
    pinsList.addEventListener(`mousedown`, onClickPin);
    pinsList.addEventListener(`keydown`, onEnterActivePin);
    mainPin.removeEventListener(`click`, window.map.onClickMainPin);
    mainPin.removeEventListener(`keydown`, window.map.onEnterMainPin);
    mainPin.addEventListener(`mousedown`, window.map.onMouseDownMainPin);
  };

  window.pins = {
    putListenersOnBlockMap: putListenersOnBlockMap,
    putListenersOnUnblockMap: putListenersOnUnblockMap,
    getPinCoords: getPinCoords,
    renderPinsOnMap: renderPinsOnMap,
    pinXOffset: pinXOffset,
    pinYOffset: pinYOffset,
    dragPin: dragPin
  };

})();
