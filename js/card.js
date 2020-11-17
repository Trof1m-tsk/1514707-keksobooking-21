  "use strict";

(function () {
  const map = document.querySelector(`.map`);
  const filtersContainer = document.querySelector(`.map__filters-container`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const onCardCloseBtnClick = function (evt) {
    if (evt.target.matches(`.popup__close`) && evt.which === 1) {
      deleteCard();
    }
  };

  const onEscCard = function (evt) {
    if (evt.key === `Escape`) {
      deleteCard();
    }
  };

  const renderCard = function (data) {
    if (!map.querySelector(`.map__card`)) {
      map.insertBefore(cardTemplate.cloneNode(true), filtersContainer);
      map.addEventListener(`click`, onCardCloseBtnClick);
      document.addEventListener(`keydown`, onEscCard);
    }

    rednderCardElement(data);
  };

  const deleteCard = function () {
    const mapCard = map.querySelector(`.map__card`);
    map.removeEventListener(`click`, onCardCloseBtnClick);
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

    photosList.forEach(function (photo, index) {
      const photoItem = document.createElement(`img`);

      photoItem.classList.add(`popup__photo`);
      photoItem.alt = `Фотография жилья ${index + 1}`;
      photoItem.src = photo;

      photosFragment.appendChild(photoItem);
    });

    return photosFragment;
  };

  const rednderCardElement = function (offerData) {
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
      item.classList.remove(`visually-hidden`);
      if (offerData.offer.features.indexOf(item.id) === -1) {
        item.classList.add(`visually-hidden`);
      }
    });

    popupDescription.textContent = offerData.offer.description;
    popupPhotos.innerHTML = ``;
    popupPhotos.appendChild(createPhotosFragment(offerData.offer.photos));
  };

  window.card = {
    renderCard,
    deleteCard
  };

})();
