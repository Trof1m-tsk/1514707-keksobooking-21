"use strict";

(function () {
  const OFFERS_NUMBER = 8;
  const AVATARS = [`img/avatars/user01.png`,
    `img/avatars/user02.png`,
    `img/avatars/user03.png`,
    `img/avatars/user04.png`,
    `img/avatars/user05.png`,
    `img/avatars/user06.png`,
    `img/avatars/user07.png`,
    `img/avatars/user08.png`];

  const PIN_OFFSET_X = 31;
  const PIN_OFFSET_Y = 84;
  const PIN_X_MAX = 1200;
  const PIN_Y_MIN = 130;
  const PIN_Y_MAX = 630;
  const MAX_PRICE = 100000;
  const MAX_ROOMS = 10;
  const MAX_GUESTS = 20;
  const PROPERTY_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const CHECKIN_HOURS = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  const generateOffer = function (offerIndex) {
    const offerAvatar = AVATARS[offerIndex];
    const xCoordinate = window.utils.getRandomNumber(PIN_X_MAX);
    const yCoordinate = window.utils.getRandomNumber(PIN_Y_MAX, PIN_Y_MIN);
    const checkinTime = CHECKIN_HOURS[window.utils.getRandomNumber(CHECKIN_HOURS.length)];

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
        price: window.utils.getRandomNumber(MAX_PRICE),
        type: PROPERTY_TYPES[window.utils.getRandomNumber(PROPERTY_TYPES.length)],
        rooms: window.utils.getRandomNumber(MAX_ROOMS, 1),
        guests: window.utils.getRandomNumber(MAX_GUESTS, 1),
        checkin: checkinTime,
        checkout: checkinTime,
        features: window.utils.createRandomList(FEATURES),
        description: `Строка с описанием`,
        photos: window.utils.createRandomList(PHOTOS)
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

  window.data = {
    offersList: createOffersList(OFFERS_NUMBER)
  };

})();
