"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const filtersContainer = document.querySelector(`.map__filters-container`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const onClickCardCross = function (evt) {
    if (evt.which === 1) {
      deleteCard();
    }
  };

  const onEscCard = function (evt) {
    if (evt.key === `Escape`) {
      deleteCard();
    }
  };

  const createCard = function () {
    map.insertBefore(cardTemplate.cloneNode(true), filtersContainer);

    const mapCard = map.querySelector(`.map__card`);
    window.card.mapCard = mapCard;

    mapCard.addEventListener(`mousedown`, onClickCardCross);
    document.addEventListener(`keydown`, onEscCard);
  };

  const deleteCard = function () {
    window.card.mapCard.removeEventListener(`mousedown`, onClickCardCross);
    document.removeEventListener(`keydown`, onEscCard);
    map.removeChild(window.card.mapCard);
  };

  window.card = {
    createCard: createCard,
    deleteCard: deleteCard
  };

})();
