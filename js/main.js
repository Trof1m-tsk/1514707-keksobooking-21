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
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinsList = document.querySelector(`.map__pins`);

document.querySelector(`.map`).classList.remove(`map--faded`);

const getRandomNumber = function (max, min=0) {
  return Math.floor(min + (Math.random() * (max - min)));
};

const createRandomList = function (array) {
  const randomSizeSet = new Set();

  array.forEach((item) => {
    randomSizeSet.add(array[getRandomNumber(array.length)]);
  });

  return new Array(randomSizeSet);
};

const generateOffer = function (offerIndex) {
  const offerAvatar = `img/avatars/user0` + (offerIndex + 1) + `.png`;
  return {
    author: {
      avatar: offerAvatar
    },
    location: {
      x: getRandomNumber(PIN_X_MAX),
      y: getRandomNumber(PIN_Y_MAX, PIN_Y_MIN)
    },
    offer: {
      title: `Заголовок предложения`,
      address: location.x + `, ` + location.y,
      orice: getRandomNumber(MAX_PRICE),
      type: PROPERTY_TYPES[getRandomNumber(PROPERTY_TYPES.length)],
      rooms: getRandomNumber(MAX_ROOMS, 1),
      guests: getRandomNumber(MAX_GUESTS, 1),
      heckin: CHECKIN_HOURS[getRandomNumber(CHECKIN_HOURS.length)],
      checkout: CHECKOUT_HOURS[getRandomNumber(CHECKOUT_HOURS.length)],
      features: createRandomList(FEATURES),
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
