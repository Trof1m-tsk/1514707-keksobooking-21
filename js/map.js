"use strict";

(function () {

  const map = document.querySelector(`.map`);
  const mainPin = window.pin.mainPin;
  const housingTypeFilter = document.querySelector(`#housing-type`);
  const pinsList = window.pin.pinsList;

  const onClickMainPin = function (evt) {
    if (evt.which === 1) {
      unblockMap();
    }
  };

  const onEnterMainPin = function (evt) {
    if (evt.key === `Enter`) {
      unblockMap();
    }
  };

  const onMouseDownMainPin = function (evt) {
    if (evt.which === 1) {
      window.pin.dragPin(evt);
    }
  };

  const onClickPin = function (evt) {
    if (evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
      window.card.createCard(window.backend.data[evt.target.closest(`.map__pin`).dataset.pinIndex]);
    }
  };

  const onEnterActivePin = function (evt) {
    if (evt.key === `Enter` && !evt.target.closest(`.map__pin--main`)) {
      window.card.createCard(window.backend.data[evt.target.closest(`.map__pin`).dataset.pinIndex]);
    }
  };

  const onChangeHousingType = function(evt) {
    const pins = pinsList.querySelectorAll(`.map__pin`);

    console.log(evt.target.value);

    pins.forEach( function (pin) {
      if (!pin.classList.contains(`.map__pin--main`)) {
        pin.remove();
      }
    });

    window.render.renderPinsOnMap(window.render.getFilteredData(evt.target.value));
  };

  const unblockMap = function () {
    map.classList.remove(`map--faded`);
    window.form.adForm.classList.remove(`ad-form--disabled`);

    window.pin.pinsList.addEventListener(`mousedown`, onClickPin);
    window.pin.pinsList.addEventListener(`keydown`, onEnterActivePin);

    mainPin.removeEventListener(`click`, onClickMainPin);
    mainPin.removeEventListener(`keydown`, onEnterMainPin);
    mainPin.addEventListener(`mousedown`, onMouseDownMainPin);

    housingTypeFilter.addEventListener(`input`, onChangeHousingType);

    window.form.roomsSelect.addEventListener(`input`, window.form.onSetRoomsChangeCapacity);
    window.form.capacitySelect.addEventListener(`input`, window.form.onChangeCapacityValidate);
    window.form.typeSelect.addEventListener(`input`, window.form.onSetTypeChangePrice);
    window.form.checkinSelect.addEventListener(`input`, window.form.onCheckoutChange);
    window.form.checkoutSelect.addEventListener(`input`, window.form.onCheckinChange);
    window.form.adForm.addEventListener(`submit`, window.form.onClickSubmit);
  };

  window.map = {
    map: map,
    unblockMap: unblockMap,
    onClickMainPin: onClickMainPin,
    onEnterMainPin: onEnterMainPin,
    housingTypeFilter: housingTypeFilter
  };

})();
