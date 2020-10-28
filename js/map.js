"use strict";

(function () {

  const map = document.querySelector(`.map`);
  const pinsList = window.pin.pinsList;
  const mainPin = window.pin.mainPin;

  const renderPinsOnMap = function (dataArray) {
    const pinsFragment = document.createDocumentFragment();

    dataArray.forEach(function (el, index) {
      const pin = window.pin.renderPin(el);
      pin.dataset.pinIndex = index;
      pin.tabindex = index + 1;
      pinsFragment.appendChild(pin);
    });
    pinsList.appendChild(pinsFragment);
  };

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

  const unblockMap = function () {
    map.classList.remove(`map--faded`);
    window.form.adForm.classList.remove(`ad-form--disabled`);

    pinsList.addEventListener(`mousedown`, onClickPin);
    pinsList.addEventListener(`keydown`, onEnterActivePin);

    mainPin.removeEventListener(`click`, onClickMainPin);
    mainPin.removeEventListener(`keydown`, onEnterMainPin);
    mainPin.addEventListener(`mousedown`, onMouseDownMainPin);

    window.form.roomsSelect.addEventListener(`input`, window.form.onSetRoomsChangeCapacity);
    window.form.capacitySelect.addEventListener(`input`, window.form.onChangeCapacityValidate);
    window.form.typeSelect.addEventListener(`input`, window.form.onSetTypeChangePrice);
    window.form.checkinSelect.addEventListener(`input`, window.form.onCheckoutChange);
    window.form.checkoutSelect.addEventListener(`input`, window.form.onCheckinChange);
  };

  const errorHandler = function (errorMessage) {
    const errPopup = document.createElement(`div`);
    errPopup.style.display = `flex`;
    errPopup.style.width = `350px`;
    errPopup.style.height = `200px`;
    errPopup.style.zIndex = `100`;
    errPopup.style.margin = `0 auto`;
    errPopup.style.alignItems = `center`;
    errPopup.style.justifyContent = `center`;
    errPopup.style.color = `red`;
    errPopup.style.backgroundColor = `white`;
    errPopup.style.border = `3px solid red`;
    errPopup.style.borderRadius = `50px`;
    errPopup.style.position = `absolute`;
    errPopup.style.left = `50%`;
    errPopup.style.top = `50%`;
    errPopup.style.fontSize = `30px`;

    errPopup.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errPopup);
  };

  window.backend.load(renderPinsOnMap, errorHandler);

  window.map = {
    map: map,
    renderPinsOnMap: renderPinsOnMap,
    unblockMap: unblockMap,
    onClickMainPin: onClickMainPin,
    onEnterMainPin: onEnterMainPin
  };

})();
