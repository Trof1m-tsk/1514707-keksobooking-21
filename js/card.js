"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const filtersContainer = document.querySelector(`.map__filters-container`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const onClickCardCloseBtn = function (evt) {
    if (evt.which === 1) {
      deleteCard();
    }
  };

  const onEscCard = function (evt) {
    if (evt.key === `Escape`) {
      deleteCard();
    }
  };

  const createCard = function (data) {
    if (!map.querySelector(`.map__card`)) {
      map.insertBefore(cardTemplate.cloneNode(true), filtersContainer);

      const mapCard = map.querySelector(`.map__card`);
      const cardCloseBtn = mapCard.querySelector(`.popup__close`);

      cardCloseBtn.addEventListener(`click`, onClickCardCloseBtn);
      document.addEventListener(`keydown`, onEscCard);
    }

    fillCard(data);
  };

  const deleteCard = function () {
    const mapCard = map.querySelector(`.map__card`);
    const cardCloseBtn = mapCard.querySelector(`.popup__close`);

    cardCloseBtn.removeEventListener(`click`, onClickCardCloseBtn);
    document.removeEventListener(`keydown`, onEscCard);
    map.removeChild(mapCard);
  };

  const getCapacityString = function (rooms, guests) {
    let guetsWord = `гост${guests === 1 ? `я` : `ей`}`;
    let roomWord = ``;

    switch (rooms) {
      case 1:
        roomWord = `комната`;
        break;
      case 2:
      case 3:
      case 4:
        roomWord = `комнаты`;
        break;
      default:
        roomWord = `комнат`;
    }

    return `${rooms} ${roomWord} для ${guests} ${guetsWord}`;
  };

  const createPhotosFragment = function (photosList) {
    const photosFragment = document.createDocumentFragment();

    photosList.forEach(function (photo) {
      const photoItem = document.createElement(`img`);
      photoItem.className = `popup__photo`;
      photoItem.width = 45;
      photoItem.height = 40;
      photoItem.alt = `Фотография жилья`;
      photoItem.src = photo;

      photosFragment.appendChild(photoItem);
    });

    return photosFragment;
  };

  const fillCard = function (offerData) {
    const card = map.querySelector(`.map__card`);

    const housingType = document.querySelector(`option[value="${offerData.offer.type}"]`).textContent;
    const popupAvatar = card.querySelector(`.popup__avatar`);
    const popupTitle = card.querySelector(`.popup__title`);
    const popupAddress = card.querySelector(`.popup__text--address`);
    const popupPrice = card.querySelector(`.popup__text--price`);
    const popupType = card.querySelector(`.popup__type`);
    const popupCapacity = card.querySelector(`.popup__text--capacity`);
    const popupTime = card.querySelector(`.popup__text--time`);
    const popupFeaturesList = card.querySelectorAll(`.popup__feature`);
    const popupDescription = card.querySelector(`.popup__description`);
    const popupPhotos = card.querySelector(`.popup__photos`);

    popupAvatar.src = offerData.author.avatar;
    popupTitle.textContent = offerData.offer.title;
    popupAddress.textContent = offerData.offer.address;
    popupPrice.textContent = `${offerData.offer.price}₽/ночь`;
    popupType.textContent = housingType;
    popupCapacity.textContent = getCapacityString(offerData.offer.rooms, offerData.offer.guests);
    popupTime.textContent = `Заезд после ${offerData.offer.checkin} выезд до ${offerData.offer.checkout}`;

    popupFeaturesList.forEach(function (item) {
      if (!offerData.offer.features.includes(item.id)) {
        item.classList.add(`visually-hidden`);
      }
    });

    popupDescription.textContent = offerData.offer.description;
    popupPhotos.innerHTML = ``;
    popupPhotos.appendChild(createPhotosFragment(offerData.offer.photos));
  };

  window.card = {
    createCard: createCard,
    deleteCard: deleteCard
  };

})();
