"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const housingTypeFilter = document.querySelector(`#housing-type`);
  const pinsList = document.querySelector(`.map__pins`);

  const onChangeFilter = function () {
    const pins = pinsList.querySelectorAll(`.map__pin`);

    pins.forEach(function (pin) {
      if (!pin.classList.contains(`.map__pin--main`)) {
        pin.remove();
      }
    });

    window.pins.renderPinsOnMap(window.filters.filterData(window.filters.initialData));
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
      window.pins.dragPin(evt);
    }
  };

  const blockMap = function () {
    map.classList.add(`map--faded`);
    window.pins.putListenersOnBlockMap();
    window.form.putListenersOnBlockMap();
    housingTypeFilter.removeEventListener(`input`, onChangeFilter);
  };

  const unblockMap = function () {
    map.classList.remove(`map--faded`);
    window.pins.putListenersOnUnblockMap();
    window.form.putListenersOnUnblockMap();
    housingTypeFilter.addEventListener(`input`, onChangeFilter);
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
