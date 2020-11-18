"use strict";

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const map = document.querySelector(`.map`);
  const mainPin = window.map.mainPin;
  const pinsList = document.querySelector(`.map__pins`);
  const pinXOffset = 32;
  const pinYOffset = 86;
  const MAP_Y_LIMIT = {min: 130, max: 630};
  const MAP_X_LIMIT = {min: 0, max: pinsList.clientWidth};

  const getPinCoords = function () {
    const pinCoodrs = {
      x: mainPin.offsetLeft + pinXOffset,
      y: mainPin.offsetTop + pinYOffset
    };

    if (mainPin.offsetTop + pinYOffset < MAP_Y_LIMIT.min) {
      pinCoodrs.y = MAP_Y_LIMIT.min;
    } else if (mainPin.offsetTop + pinYOffset > MAP_Y_LIMIT.max) {
      pinCoodrs.y = MAP_Y_LIMIT.max;
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

      if (mainPin.offsetLeft - shift.x <= MAP_X_LIMIT.min - pinXOffset) {
        mainPin.style.left = (MAP_X_LIMIT.min - pinXOffset) + `px`;
      } else if (mainPin.offsetLeft - shift.x >= MAP_X_LIMIT.max - pinXOffset) {
        mainPin.style.left = (MAP_X_LIMIT.max - pinXOffset) + `px`;
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
      }

      if (mainPin.offsetTop - shift.y <= MAP_Y_LIMIT.min - pinYOffset) {
        mainPin.style.top = `${(MAP_Y_LIMIT.min - pinYOffset)}px`;
      } else if (mainPin.offsetTop - shift.y >= MAP_Y_LIMIT.max - pinYOffset) {
        mainPin.style.top = `${(MAP_Y_LIMIT.max - pinYOffset)}px`;
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
      }


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

  const removePins = function () {
    const pins = pinsList.querySelectorAll(`.map__pin`);
    pins.forEach(function (pin) {
      if (!pin.classList.contains(`map__pin--main`)) {
        pin.remove();
      }
    });
  };

  const onMainPinPressEnter = function (evt) {
    if (evt.key === `Enter`) {
      window.map.unblockMap();
      window.pins.renderPinsOnMap(window.backend.data);
    }
  };

  const onMainPinMouseDown = function (evt) {
    if (evt.which === 1) {
      if (map.classList.contains(`map--faded`)) {
        window.map.unblockMap();
        window.pins.renderPinsOnMap(window.backend.data);
      }

      dragPin(evt);
    }
  };

  const onPinClick = function (evt) {
    const activePin = document.querySelector(`.map__pin--active`);

    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }

    if (evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
      evt.target.closest(`.map__pin`).classList.add(`map__pin--active`);
      window.card.render(
          window.filters.filterData(
              window.backend.data)[evt.target.closest(`.map__pin`).dataset.pinIndex]
      );
    }
  };

  const onActivePinEnter = function (evt) {
    const activePin = document.querySelector(`.map__pin--active`);

    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }

    if (evt.key === `Enter` && !evt.target.closest(`.map__pin--main`)) {
      evt.target.closest(`.map__pin`).classList.add(`map__pin--active`);
      window.card.render(
          window.filters.filterData(
              window.backend.data)[evt.target.closest(`.map__pin`).dataset.pinIndex]
      );
    }
  };

  const putListenersOnBlockMap = function () {
    pinsList.removeEventListener(`mousedown`, onPinClick);
    pinsList.removeEventListener(`keydown`, onActivePinEnter);
    mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  };

  const putListenersOnUnblockMap = function () {
    pinsList.addEventListener(`mousedown`, onPinClick);
    pinsList.addEventListener(`keydown`, onActivePinEnter);
    mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
  };

  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);

  const updatePins = function () {
    const pins = pinsList.querySelectorAll(`.map__pin`);

    removePins(pins);
    renderPinsOnMap(window.filters.filterData(window.backend.data));
  };

  window.pins = {
    putListenersOnBlockMap,
    putListenersOnUnblockMap,
    onMainPinPressEnter,
    onMainPinMouseDown,
    getPinCoords,
    renderPinsOnMap,
    removePins,
    updatePins,
    pinXOffset,
    pinYOffset
  };

})();
