"use strict";

const OFFERS_NUMBER = 8;
const AVATARS = [`img/avatars/user01.png`,
  `img/avatars/user02.png`,
  `img/avatars/user03.png`,
  `img/avatars/user04.png`,
  `img/avatars/user05.png`,
  `img/avatars/user06.png`,
  `img/avatars/user07.png`,
  `img/avatars/user08.png`];
const PIN_X_MAX = 1200;
const PIN_Y_MIN = 130;
const PIN_Y_MAX = 630;
const PIN_OFFSET_X = 31;
const PIN_OFFSET_Y = 84;
const MAX_PRICE = 100000;
const MAX_ROOMS = 10;
const MAX_GUESTS = 20;
const PROPERTY_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_HOURS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinsList = document.querySelector(`.map__pins`);
const mainPin = document.querySelector(`.map__pin--main`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const filtersContainer = document.querySelector(`.map__filters-container`);
const adForm = document.querySelector(`.ad-form`);
const addressInput = document.querySelector(`#address`);

const getRandomNumber = function (max, min = 0) {
  return Math.floor(min + (Math.random() * (max - min)));
};

const createRandomList = function (array) {
  const randomSizeSet = new Set();

  array.forEach(function () {
    randomSizeSet.add(array[getRandomNumber(array.length)]);
  });

  return Array.from(randomSizeSet);
};

const generateOffer = function (offerIndex) {
  const offerAvatar = AVATARS[offerIndex];
  const xCoordinate = getRandomNumber(PIN_X_MAX);
  const yCoordinate = getRandomNumber(PIN_Y_MAX, PIN_Y_MIN);
  const checkinTime = CHECKIN_HOURS[getRandomNumber(CHECKIN_HOURS.length)];

  return {
    author: {
      avatar: offerAvatar
    },
    location: {
      x: xCoordinate,
      y: yCoordinate
    },
    offer: {
      title: `Заголовок предложения`,
      address: `${xCoordinate}, ${yCoordinate}`,
      price: getRandomNumber(MAX_PRICE),
      type: PROPERTY_TYPES[getRandomNumber(PROPERTY_TYPES.length)],
      rooms: getRandomNumber(MAX_ROOMS, 1),
      guests: getRandomNumber(MAX_GUESTS, 1),
      checkin: checkinTime,
      checkout: checkinTime,
      features: createRandomList(FEATURES),
      description: `Строка с описанием`,
      photos: createRandomList(PHOTOS)
    }
  };
};

const createOffersList = function (number) {
  const createdOffersList = [];

  for (let i = 0; i < number; i++) {
    createdOffersList.push(generateOffer(i));
  }

  return createdOffersList;
};

const offersList = createOffersList(OFFERS_NUMBER);

const renderPinElement = function (offerData) {
  const pinElement = pinTemplate.cloneNode(true);
  const pinImage = pinElement.querySelector(`img`);

  pinElement.style = `left: ${offerData.location.x - PIN_OFFSET_X}px;
    top: ${offerData.location.y - PIN_OFFSET_Y}px;`;
  pinElement.dataset.pinIndex = ``;
  pinImage.src = offerData.author.avatar;
  pinImage.alt = offerData.offer.title;

  return pinElement;
};

const renderPinsOnMap = function (dataArray) {
  const pinsFragment = document.createDocumentFragment();

  dataArray.forEach(function (el, index = 0) {
    const pin = renderPinElement(el);
    pin.dataset.pinIndex = index;
    pin.tabindex = index + 1;
    pinsFragment.appendChild(pin);
  });
  pinsList.appendChild(pinsFragment);
};

renderPinsOnMap(offersList);

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

map.insertBefore(cardTemplate.cloneNode(true), filtersContainer);

const cardElement = map.querySelector(`.map__card`);
const popupAvatar = cardElement.querySelector(`.popup__avatar`);
const popupTitle = cardElement.querySelector(`.popup__title`);
const popupAddress = cardElement.querySelector(`.popup__text--address`);
const popupPrice = cardElement.querySelector(`.popup__text--price`);
const popupType = cardElement.querySelector(`.popup__type`);
const popupCapacity = cardElement.querySelector(`.popup__text--capacity`);
const popupTime = cardElement.querySelector(`.popup__text--time`);
const popupFeaturesList = cardElement.querySelectorAll(`.popup__feature`);
const popupDescription = cardElement.querySelector(`.popup__description`);
const popupPhotos = cardElement.querySelector(`.popup__photos`);

const fillCard = function (offerData) {
  const housingType = document.querySelector(`option[value="${offerData.offer.type}"]`).textContent;

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

const mapCard = map.querySelector(`.map__card`);
const mapPins = map.querySelectorAll(`.map__pin`);
const cardCloseButton = mapCard.querySelector(`.popup__close`);

const onClickCardCross = function (evt) {
  if (evt.which === 1) {
    hideCard();
  }
};

const onEscOpenCard = function (evt) {
  if (evt.key === `Escape`) {
    hideCard();
  }
};

const onClickShowCard = function (evt) {
  if (!this.classList.contains(`map__pin--main`)) {
    fillCard(offersList[this.dataset.pinIndex]);
    if (mapCard.classList.contains(`visually-hidden`)) {
      showCard();
    }
  }
};

const onEnterShowCard = function (evt) {
  if (evt.key === `Enter`) {
    if (!this.classList.contains(`map__pin--main`)) {
      fillCard(offersList[this.dataset.pinIndex]);
      if (mapCard.classList.contains(`visually-hidden`)) {
        showCard();
      }
    }
  }
};

const showCard = function () {
  mapCard.classList.remove(`visually-hidden`);
  cardCloseButton.addEventListener(`mousedown`, onClickCardCross);
  document.addEventListener(`keydown`, onEscOpenCard);
};

const hideCard = function () {
  mapCard.classList.add(`visually-hidden`);
  cardCloseButton.removeEventListener(`mousedown`, onClickCardCross);
  document.removeEventListener(`keydown`, onEscOpenCard);
};

const mapUnblock = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

  mapPins.forEach(function (pin) {
    pin.addEventListener(`mousedown`, onClickShowCard);
    pin.addEventListener(`keydown`, onEnterShowCard);
  });

  roomsSelect.addEventListener(`input`, onSetRoomsChangeCapacity);
  capacitySelect.addEventListener(`input`, onChangeCapacityValidate);
  typeSelect.addEventListener(`input`, onSetTypeChangePrice);
  checkinSelect.addEventListener(`input`, onCheckoutChange);
  checkoutSelect.addEventListener(`input`, onCheckinChange);
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

const pinCoords = function (pinElement) {
  return `${pinElement.offsetLeft + PIN_OFFSET_X}, ${pinElement.offsetTop + PIN_OFFSET_Y}`;
};

addressInput.value = pinCoords(mainPin);

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
