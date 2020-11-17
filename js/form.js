"use strict";

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const resetButton = adForm.querySelector(`.ad-form__reset`);
  const fieldSets = adForm.querySelectorAll(`fieldset`);
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

  const setAddress = function () {
    addressInput.value = window.pins.getPinCoords(mainPin);
  };

  mainPin.addEventListener(`mousemove`, setAddress);

  const onRoomsChangeCapacity = function (evt) {
    if (evt.target.value === `100`) {
      capacitySelect.querySelector(`option[value="0"]`).selected = `selected`;
    } else if (evt.target.value === `3` && capacitySelect.value === `0`) {
      capacitySelect.querySelector(`option[value="3"]`).selected = `selected`;
    } else if (evt.target.value === `2` && (capacitySelect.value === `3` || capacitySelect.value === `0`)) {
      capacitySelect.querySelector(`option[value="2"]`).selected = `selected`;
    } else if (evt.target.value === `1`) {
      capacitySelect.querySelector(`option[value="1"]`).selected = `selected`;
    }
  };

  const onCapacityChange = function (evt) {
    if (roomsSelect.value === `100` && evt.target.value !== `0`) {
      capacitySelect.setCustomValidity(`Не для гостей`);
    } else if (roomsSelect.value === `3` && evt.target.value === `0`) {
      capacitySelect.setCustomValidity(`Количество гостей может быть 1, 2 или 3`);
    } else if (roomsSelect.value === `2` && (evt.target.value === `0` || evt.target.value === `3`)) {
      capacitySelect.setCustomValidity(`Количество гостей может быть 1 или 2`);
    } else if (roomsSelect.value === `1` && evt.target.value !== `1`) {
      capacitySelect.setCustomValidity(`Только для одного гостя`);
    } else {
      capacitySelect.setCustomValidity(``);
    }

    capacitySelect.reportValidity();
  };

  const onTypeChangePrice = function (evt) {
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

  const blockFields = function () {
    fieldSets.forEach(function (fieldset) {
      fieldset.setAttribute(`disabled`, true);
    });
  };

  const unblockFields = function () {
    fieldSets.forEach(function (fieldset) {
      fieldset.removeAttribute(`disabled`);
    });
  };

  const resetPage = function () {
    if (window.map.map.querySelector(`.map__card`)) {
      window.card.deleteCard();
    }

    window.map.blockMap();
    window.filters.filters.reset();
    window.pins.removePins();
    adForm.reset();
    blockFields();
    window.map.mainPin.style = `left: 570px; top: 375px`;
    setAddress();
  };

  const onReset = function (evt) {
    evt.preventDefault();
    resetPage();
  };

  const onSuccess = function () {
    resetPage();
    window.popups.showSuccessPopup();
  };

  const onSubmit = function (evt) {
    const data = new FormData(adForm);
    evt.preventDefault();
    window.backend.upload(data, onSuccess, window.popups.showErrorPopup);
  };

  const putListenersOnBlockMap = function () {
    adForm.classList.add(`ad-form--disabled`);
    roomsSelect.removeEventListener(`input`, onRoomsChangeCapacity);
    capacitySelect.removeEventListener(`input`, onCapacityChange);
    typeSelect.removeEventListener(`input`, onTypeChangePrice);
    checkinSelect.removeEventListener(`input`, onCheckoutChange);
    checkoutSelect.removeEventListener(`input`, onCheckinChange);
    resetButton.removeEventListener(`click`, onReset);
    adForm.removeEventListener(`submit`, onSubmit);
  };

  const putListenersOnUnblockMap = function () {
    adForm.classList.remove(`ad-form--disabled`);
    roomsSelect.addEventListener(`input`, onRoomsChangeCapacity);
    capacitySelect.addEventListener(`input`, onCapacityChange);
    typeSelect.addEventListener(`input`, onTypeChangePrice);
    checkinSelect.addEventListener(`input`, onCheckoutChange);
    checkoutSelect.addEventListener(`input`, onCheckinChange);
    resetButton.addEventListener(`click`, onReset);
    adForm.addEventListener(`submit`, onSubmit);
  };

  setAddress();

  window.form = {
    adForm,
    setAddress,
    putListenersOnBlockMap,
    putListenersOnUnblockMap,
    addressInput,
    onReset,
    blockFields,
    unblockFields
  };

})();
