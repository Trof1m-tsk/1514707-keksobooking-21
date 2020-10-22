"use strict";

(function () {

  window.map.renderPinsOnMap(window.data.offersList);

  const map = document.querySelector(`.map`);
  const mainPin = window.map.mainPin;

  const onClickPin = function (evt) {
    if (!evt.currentTarget.classList.contains(`map__pin--main`)) {

      if (!map.querySelector(`.map__card`)) {
        window.card.createCard();
      }

      window.fillCard.fill(window.data.offersList[evt.currentTarget.dataset.pinIndex]);
    }
  };

  const onEnterActivePin = function (evt) {
    if (evt.key === `Enter` && !evt.target.classList.contains(`map__pin--main`)) {

      if (!map.querySelector(`.map__card`)) {
        window.card.createCard();
      }

      window.fillCard.fill(window.data.offersList[evt.target.dataset.pinIndex]);
    }
  };

  const mapPins = map.querySelectorAll(`.map__pin`);

  const mapUnblock = function () {
    map.classList.remove(`map--faded`);
    window.form.adForm.classList.remove(`ad-form--disabled`);

    mapPins.forEach(function (pin) {
      pin.addEventListener(`mousedown`, onClickPin);
      pin.addEventListener(`keydown`, onEnterActivePin);
    });

    window.form.roomsSelect.addEventListener(`input`, window.form.onSetRoomsChangeCapacity);
    window.form.capacitySelect.addEventListener(`input`, window.form.onChangeCapacityValidate);
    window.form.typeSelect.addEventListener(`input`, window.form.onSetTypeChangePrice);
    window.form.checkinSelect.addEventListener(`input`, window.form.onCheckoutChange);
    window.form.checkoutSelect.addEventListener(`input`, window.form.onCheckinChange);
  };

  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      mapUnblock();
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      mapUnblock();
    }
  });

})();
