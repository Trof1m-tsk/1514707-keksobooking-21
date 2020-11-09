"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const housingTypeFilter = document.querySelector(`#housing-type`);
  const pinsList = document.querySelector(`.map__pins`);

  const onChangeHousingType = function (evt) {
    const pins = pinsList.querySelectorAll(`.map__pin`);

    pins.forEach(function (pin) {
      if (!pin.classList.contains(`.map__pin--main`)) {
        pin.remove();
      }
    });

    window.pins.renderPinsOnMap(window.filters.filterData());
  };

  const onClickMainPin = function (evt) {
    if (evt.which === 1) {
      window.map.unblockMap();
    }
  };

  const onEnterMainPin = function (evt) {
    if (evt.key === `Enter`) {
      window.map.unblockMap();
    }
  };

  const onMouseDownMainPin = function (evt) {
    if (evt.which === 1) {
      dragPin(evt);
    }
  };

  const blockMap = function () {
    map.classList.add(`map--faded`);
    window.pins.putListenersOnBlockMap();
    window.form.putListenersOnBlockMap();
    housingTypeFilter.removeEventListener(`input`, onChangeHousingType);
  };

  const unblockMap = function () {
    map.classList.remove(`map--faded`);
    window.pins.putListenersOnUnblockMap();
    window.form.putListenersOnUnblockMap();
    housingTypeFilter.addEventListener(`input`, onChangeHousingType);
  };

  window.map = {
    map: map,
    mainPin: mainPin,
    pinsList: pinsList,
    blockMap: blockMap,
    unblockMap: unblockMap,
    housingTypeFilter: housingTypeFilter,
    onClickMainPin: onClickMainPin,
    onEnterMainPin: onEnterMainPin,
    onMouseDownMainPin: onMouseDownMainPin
  };

})();
