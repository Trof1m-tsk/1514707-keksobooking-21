"use strict";

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const addressInput = document.querySelector(`#address`);
  const roomsSelect = adForm.querySelector(`#room_number`);
  const capacitySelect = adForm.querySelector(`#capacity`);
  const priceInput = adForm.querySelector(`#price`);
  const typeSelect = adForm.querySelector(`#type`);
  const minPrices = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  const checkinSelect = adForm.querySelector(`#timein`);
  const checkoutSelect = adForm.querySelector(`#timeout`);
  const mainPin = window.map.mainPin;

  mainPin.addEventListener(`mousemove`, function () {
    addressInput.value = window.pins.getPinCoords(mainPin);
  });

  const onSetRoomsChangeCapacity = function (evt) {
    if (evt.target.value === `100`) {
      capacitySelect.querySelector(`option[value="0"]`).selected = `selected`;
    } else if (evt.target.value === `3`) {
      capacitySelect.querySelector(`option[value="3"]`).selected = `selected`;
    } else if (evt.target.value === `2`) {
      capacitySelect.querySelector(`option[value="2"]`).selected = `selected`;
    } else if (evt.target.value === `1`) {
      capacitySelect.querySelector(`option[value="1"]`).selected = `selected`;
    }
  };

  const onChangeCapacityValidate = function (evt) {
    if (roomsSelect.value === `100` && evt.target.value !== `0`) {
      capacitySelect.setCustomValidity(`Не для гостей`);
    } else if (roomsSelect.value === `3` && evt.target.value === `0`) {
      capacitySelect.setCustomValidity(`Количество гостей может быть 1, 2 или 3`);
    } else if (roomsSelect.value === `2` && evt.target.value === `0` ||
        roomsSelect.value === `2` && capacitySelect.value === `3`) {
      capacitySelect.setCustomValidity(`Количество гостей может быть 1 или 2`);
    } else if (roomsSelect.value === `1` && !evt.target.value !== `1`) {
      capacitySelect.setCustomValidity(`Только для одного гостя`);
    } else {
      capacitySelect.setCustomValidity(``);
    }

    capacitySelect.reportValidity();
  };

  const onSetTypeChangePrice = function (evt) {
    if (evt.target.value === `bungalow`) {
      priceInput.min = minPrices.bungalow;
      priceInput.placeholder = minPrices.bungalow;
    } else if (evt.target.value === `flat`) {
      priceInput.min = minPrices.flat;
      priceInput.placeholder = minPrices.flat;
    } else if (evt.target.value === `house`) {
      priceInput.min = minPrices.house;
      priceInput.placeholder = minPrices.house;
    } else if (evt.target.value === `palace`) {
      priceInput.min = minPrices.palace;
      priceInput.placeholder = minPrices.palace;
    }
  };

  const onCheckoutChange = function (evt) {
    checkoutSelect.querySelector(`option[value="${evt.target.value}"]`).selected = `selected`;
  };

  const onCheckinChange = function (evt) {
    checkinSelect.querySelector(`option[value="${evt.target.value}"]`).selected = `selected`;
  };

  const putListenersOnBlockMap = function () {
    adForm.classList.add(`ad-form--disabled`);
    roomsSelect.removeEventListener(`input`, onSetRoomsChangeCapacity);
    capacitySelect.removeEventListener(`input`, onChangeCapacityValidate);
    typeSelect.removeEventListener(`input`, onSetTypeChangePrice);
    checkinSelect.removeEventListener(`input`, onCheckoutChange);
    checkoutSelect.removeEventListener(`input`, onCheckinChange);
  };

  const putListenersOnUnblockMap = function () {
    adForm.classList.remove(`ad-form--disabled`);
    roomsSelect.addEventListener(`input`, onSetRoomsChangeCapacity);
    capacitySelect.addEventListener(`input`, onChangeCapacityValidate);
    typeSelect.addEventListener(`input`, onSetTypeChangePrice);
    checkinSelect.addEventListener(`input`, onCheckoutChange);
    checkoutSelect.addEventListener(`input`, onCheckinChange);
  };


  window.form = {
    adForm: adForm,
    putListenersOnBlockMap: putListenersOnBlockMap,
    putListenersOnUnblockMap: putListenersOnUnblockMap,
    addressInput: addressInput
  };

})();
