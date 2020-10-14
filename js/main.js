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
const CHECKOUT_HOURS = [`12:00`, `13:00`, `14:00`];
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

  pinElement.style = `left: ${offerData.location.x - PIN_OFFSET_X}px;
    top: ${offerData.location.y - PIN_OFFSET_Y}px;`;
  pinImage.src = offerData.author.avatar;
  pinImage.alt = offerData.offer.title;

  return pinElement;
};

const renderPinsOnMap = function (dataArray) {
  const pinsFragment = document.createDocumentFragment();

  dataArray.forEach(function (el) {
    pinsFragment.appendChild(renderPinElement(el));
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

const renderCardElement = function (offerData) {
  const cardElement = cardTemplate.cloneNode(true);
  const housingType = document.querySelector(`option[value="${offerData.offer.type}"]`).textContent;
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
  popupPhotos.appendChild(createPhotosFragment(offerData.offer.photos));

  return cardElement;
};

const mapUnblock = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
};

map.insertBefore(renderCardElement(offersList[0]), filtersContainer);

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

const onSetRoomsChangeCapacity = function () {
  if (roomsSelect.value === `100`) {
    capacitySelect.querySelector(`option[value="0"]`).setAttribute(`selected`, `selected`);
  } else if (roomsSelect.value === `3`) {
    capacitySelect.querySelector(`option[value="3"]`).setAttribute(`selected`, `selected`);
  } else if (roomsSelect.value === `2`) {
    capacitySelect.querySelector(`option[value="2"]`).setAttribute(`selected`, `selected`);
  } else if (roomsSelect.value === `1`) {
    capacitySelect.querySelector(`option[value="1"]`).setAttribute(`selected`, `selected`);
  }
};

const onCangeCapacityValidate = function () {
  if (roomsSelect.value === `100` && capacitySelect.value !== `0`) {
    capacitySelect.setCustomValidity(`Не для гостей`);
  } else if (roomsSelect.value === `3` && capacitySelect.value === `0`) {
    capacitySelect.setCustomValidity(`Количество гостей может быть 1, 2 или 3`);
  } else if (roomsSelect.value === `2` && capacitySelect.value === `0` ||
      roomsSelect.value === `2` && capacitySelect.value === `3`) {
    capacitySelect.setCustomValidity(`Количество гостей может быть 1 или 2`);
  } else if (roomsSelect.value === `1` && !capacitySelect.value !== `1`) {
    capacitySelect.setCustomValidity(`Только для одного гостя`);
  } else {
    capacitySelect.setCustomValidity(``);
  }

  capacitySelect.reportValidity();
};

roomsSelect.addEventListener(`input`, onSetRoomsChangeCapacity);

capacitySelect.addEventListener(`input`, onCangeCapacityValidate);
