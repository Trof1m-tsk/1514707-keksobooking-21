"use strict";

const OBJECTS_NUMBER = 8;
const PIN_X_MAX = 1200;
const PIN_Y_MIN = 130;
const PIN_Y_MAX = 630;
const MAX_PRICE = 100000;
const MAX_ROOMS = 10;
const MAX_GUESTS = 20;
const PROPERTY_TYPES = [`palace`, `flat`, `house`,  `bungalow`];
const CHECKIN_HOURS = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_HOURS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinsList = document.querySelector(`.map__pins`);

document.querySelector(`.map`).classList.remove(`map--faded`);

const getRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

const createRandomSizeArray = function (array) {
  const randomSizeArray = [];
  const size = 1 + getRandomNumber(array.length);

  for (let i = 0; i < size; i++) {
    const arrayItem = array[getRandomNumber(array.length)];
    if (!randomSizeArray.includes(arrayItem)) {
      randomSizeArray.push(arrayItem);
    }
  }

  return randomSizeArray;
};

const generateObjectsArray = function (number) {
  const createdObjectsArray = [];

  for (let i = 0; i < number; i++) {
    const obj = {};
    obj.author = {};
    obj.author.avatar = `img/avatars/user0`+ (i + 1) +`.png`;
    obj.location = {};
    obj.location.x = getRandomNumber(PIN_X_MAX);
    obj.location.y = PIN_Y_MIN + getRandomNumber(PIN_Y_MAX - PIN_Y_MIN);
    obj.offer = {};
    obj.offer.title = `Заголовок предложения`;
    obj.offer.address = obj.location.x + `, ` + obj.location.y;
    obj.offer.price = getRandomNumber(MAX_PRICE);
    obj.offer.type = PROPERTY_TYPES[getRandomNumber(PROPERTY_TYPES.length)];
    obj.offer.rooms = 1 + getRandomNumber(MAX_ROOMS);
    obj.offer.guests = 1 + getRandomNumber(MAX_GUESTS);
    obj.offer.checkin = CHECKIN_HOURS[getRandomNumber(CHECKIN_HOURS.length)];
    obj.offer.checkout = CHECKOUT_HOURS[getRandomNumber(CHECKOUT_HOURS.length)];
    obj.offer.features = createRandomSizeArray(FEATURES);
    obj.offer.photos = createRandomSizeArray(PHOTOS);
    createdObjectsArray.push(obj);
  }

  return createdObjectsArray;
};

const objectsArray = generateObjectsArray(OBJECTS_NUMBER);

const renderPinElement = function (offerData) {
  const pinElement = pinTemplate.cloneNode(true);
  const pinImage = pinElement.querySelector(`img`);

  pinElement.style = `left: ` + (offerData.location.x - 31) + `px; top: ` + (offerData.location.y - 84) + `px;`;
  pinImage.src = offerData.author.avatar;
  pinImage.alt = offerData.offer.title;

  return pinElement;
};

const renderPinsOnMap = function (objectsArray) {
  const pinsFragment = document.createDocumentFragment();

  for (let i = 0; i < objectsArray.length; i++) {
    pinsFragment.appendChild(renderPinElement(objectsArray[i]));
  }
  pinsList.appendChild(pinsFragment);
};

renderPinsOnMap(objectsArray);
