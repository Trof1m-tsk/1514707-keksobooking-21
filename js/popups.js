"use strict";

(function () {
  const main = document.querySelector(`.main`);
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
    main.insertBefore(successPopupTemplate.cloneNode(true), window.map.map);
    document.addEventListener(`keydown`, onEscSuccessPopup);
    document.addEventListener(`click`, hideSuccessPopup);
  };

  const onEscErrorPopup = function (evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
    } else if (evt.key === `Escape`) {
      hideErrorPopup();
    }
  };

  const hideErrorPopup = function () {
    document.removeEventListener(`keydown`, onEscErrorPopup);
    document.removeEventListener(`click`, hideErrorPopup);
    main.removeChild(main.querySelector(`.error`));
  };

  const showErrorPopup = function (errorText, buttonText) {
    main.insertBefore(errorPopupTemplate.cloneNode(true), window.map.map);
    main.querySelector(`.error__message`).textContent = errorText;

    if (buttonText) {
      main.querySelector(`.error__button`).textContent = buttonText;
    }

    document.addEventListener(`keydown`, onEscErrorPopup);
    document.addEventListener(`click`, hideErrorPopup);
  };

  window.popups = {
    showSuccessPopup,
    showErrorPopup
  };

})();
