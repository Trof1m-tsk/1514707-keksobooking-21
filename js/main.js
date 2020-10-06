"use strict";

const OFFERS_NUMBER = 8;
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
const CHECKOUT_HOURS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const theMap = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinsList = document.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const filtersContainer = document.querySelector(`.map__filters-container`);

document.querySelector(`.map`).classList.remove(`map--faded`);

const getRandomNumber = function (max, min = 0) {
  return Math.floor(min + (Math.random() * (max - min)));
};

const createRandomList = function (array) {
  const randomSizeSet = new Set();

  array.forEach(() => {
    randomSizeSet.add(array[getRandomNumber(array.length)]);
  });

  return new Array(randomSizeSet);
};

const generateOffer = function (offerIndex) {
  const offerAvatar = `img/avatars/user0` + (offerIndex + 1) + `.png`;
  const xCoordinate = getRandomNumber(PIN_X_MAX);
  const yCoordinate = getRandomNumber(PIN_Y_MAX, PIN_Y_MIN);

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
      address: xCoordinate + `, ` + yCoordinate,
      price: getRandomNumber(MAX_PRICE),
      type: PROPERTY_TYPES[getRandomNumber(PROPERTY_TYPES.length)],
      rooms: getRandomNumber(MAX_ROOMS, 1),
      guests: getRandomNumber(MAX_GUESTS, 1),
      checkin: CHECKIN_HOURS[getRandomNumber(CHECKIN_HOURS.length)],
      checkout: CHECKOUT_HOURS[getRandomNumber(CHECKOUT_HOURS.length)],
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

  pinElement.style = `left: ` + (offerData.location.x - PIN_OFFSET_X) +
  `px; top: ` + (offerData.location.y - PIN_OFFSET_Y) + `px;`;
  pinImage.src = offerData.author.avatar;
  pinImage.alt = offerData.offer.title;

  return pinElement;
};

const renderPinsOnMap = function (dataArray) {
  const pinsFragment = document.createDocumentFragment();

  dataArray.forEach((el) => {
    pinsFragment.appendChild(renderPinElement(el));
  });
  pinsList.appendChild(pinsFragment);
};

renderPinsOnMap(offersList);

const getCapacityString = function (rooms, guests) {
  let roomWord = `комнат`;
  let guetsWord = `гост`;

  if (rooms === 1) {
    roomWord += `а`;
  } else if (rooms === 2 || rooms === 3 || rooms === 4) {
    roomWord += `ы`;
  };

  if (guests === 1) {
    guetsWord += `я`;
  } else {
    guetsWord += `ей`;
  };

  return rooms + ` ` + roomWord +  ` для ` + guests + ` ` + guetsWord;
};


const renderCardElement = function (firstOfferData) {
  const cardElement = cardTemplate.cloneNode(true);
  const housingType = document.getElementById(firstOfferData.offer.type).textContent;

  const popupAvatar = cardElement.querySelector(`.popup__avatar`);
  const popupTitle = cardElement.querySelector(`.popup__title`);
  const popupAddress = cardElement.querySelector(`.popup__text--address`);
  const popupPrice = cardElement.querySelector(`.popup__text--price`);
  const popupType = cardElement.querySelector(`.popup__type`);
  const popupCapacity = cardElement.querySelector(`.popup__text--capacity`);
  const popupTime = cardElement.querySelector(`.popup__text--time`);
  const popupFeatures = cardElement.querySelector(`.popup__features`);
  const popupFeaturesList = cardElement.querySelectorAll(`.popup__feature`);
  const popupWifi = cardElement.querySelector(`.popup__feature--wifi`);
  const popupDishwasher = cardElement.querySelector(`.popup__feature--dishwasher`);
  const popupParking = cardElement.querySelector(`.popup__feature--parking`);
  const popupWasher = cardElement.querySelector(`.popup__feature--washer`);
  const popupElevator = cardElement.querySelector(`.popup__feature--elevator`);
  const popupConditioner = cardElement.querySelector(`.popup__feature--conditioner`);
  const popupDescription = cardElement.querySelector(`.popup__description`);
  const popupPhotos = cardElement.querySelector(`.popup__photos`);
  const popupPhoto = cardElement.querySelector(`.popup__photo`);

  popupAvatar.src = firstOfferData.author.avatar;
  popupTitle.textContent = firstOfferData.offer.title;
  popupAddress.textContent = firstOfferData.offer.address;
  popupPrice.textContent = firstOfferData.offer.price + `₽/ночь`;
  popupType.textContent = housingType;
  popupCapacity.textContent = getCapacityString(firstOfferData.offer.rooms, firstOfferData.offer.guests);
  popupTime.textContent = `Заезд после ` + firstOfferData.offer.checkin + `, выезд до ` + firstOfferData.offer.checkout;

  popupDescription.textContent = firstOfferData.offer.description;

  return cardElement;
};

theMap.insertBefore(renderCardElement(offersList[0]), filtersContainer);
