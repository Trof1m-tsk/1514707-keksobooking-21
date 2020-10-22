"use strict";

(function () {
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

  window.utils = {
    getRandomNumber: getRandomNumber,
    createRandomList: createRandomList
  };

})();
