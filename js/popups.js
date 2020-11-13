"use strict";

(function () {
  const main = document.querySelector(`main`);
  const successPopupTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorPopupTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const onEscSuccessPopup = function (evt) {
    if (evt.key === `Escape`) {
      hideSuccessPopup();
    }
  };

  const hideSuccessPopup = function () {
    document.removeEventListener(`keydown`, onEscSuccessPopup);
    document.removeEventListener(`click`, hideSuccessPopup);
    main.removeChild(main.querySelector(`.success`));
  };

  const showSuccessPopup = function () {
    window.map.blockMap();
    main.insertBefore(successPopupTemplate.cloneNode(true), window.map.map);
    document.addEventListener(`keydown`, onEscSuccessPopup);
    document.addEventListener(`click`, hideSuccessPopup);
  };

  const onEscErrorPopup = function (evt) {
    if (evt.key === `Escape`) {
      hideErrorPopup();
    }
  };

  const hideErrorPopup = function () {
    document.removeEventListener(`keydown`, onEscErrorPopup);
    main.querySelector(`.error__button`).removeEventListener(`click`, hideErrorPopup);
    main.removeChild(main.querySelector(`.error`));
  };

  const showErrorPopup = function (errorText) {
    main.insertBefore(errorPopupTemplate.cloneNode(true), window.map.map);
    main.querySelector(`.error__message`).textContent = errorText;
    document.addEventListener(`keydown`, onEscErrorPopup);
    main.querySelector(`.error__button`).addEventListener(`click`, hideErrorPopup);
  };

  window.popups = {
    showSuccessPopup,
    showErrorPopup
  };

})();
