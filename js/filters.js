"use strict";

(function () {
  const filters = document.querySelector(`.map__filters`);
  const typeFilter = document.querySelector(`#housing-type`);
  const priceFilter = document.querySelector(`#housing-price`);
  const roomsFilter = document.querySelector(`#housing-rooms`);
  const guestsFilter = document.querySelector(`#housing-guests`);
  const featuresFilter = document.querySelector(`#housing-features`);
  const featuresBar = document.querySelector(`.map__features`);
  const wifi = featuresBar.querySelector(`#filter-wifi`);
  const dishwasher = featuresBar.querySelector(`#filter-dishwasher`);
  const parking = featuresBar.querySelector(`#filter-parking`);
  const washer = featuresBar.querySelector(`#filter-washer`);
  const elevator = featuresBar.querySelector(`#filter-elevator`);
  const conditioner = featuresBar.querySelector(`#filter-conditioner`);

  const MAX_COUNT = 5;
  const PRICE = {
    low: 10000,
    middle: 50000
  };

  const onFilterChange = window.createDebounce(function () {
    window.pins.updatePins();
  });

  const addFiltersListeners = function () {
    filters.addEventListener(`change`, onFilterChange);
  };

  const removeFiltersListeners = function () {
    filters.removeEventListener(`change`, onFilterChange);
  };

  const filterData = function (data) {
    let typeFilterData = [];
    let priceFilterArray = [];
    let roomsFilterArray = [];
    let guestsFilterArray = [];
    let wifiFilterArray = [];
    let dishwasherFilterArray = [];
    let parkingFilterArray = [];
    let washerFilterArray = [];
    let elevatorFilterArray = [];
    let conditionerFilterArray = [];

    if (typeFilter.value !== `any`) {
      let count = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].offer.type === typeFilter.value) {
          count++;
          typeFilterData.push(data[i]);
        }
        if (count >= MAX_COUNT) {
          break;
        }
      }
    } else {
      typeFilterData = data;
    }

    if (priceFilter.value !== `any`) {
      let count = 0;
      for (let i = 0; i < typeFilterData.length; i++) {
        if (typeFilterData[i].offer.price < PRICE.low && priceFilter.value === `low`) {
          count++;
          priceFilterArray.push(typeFilterData[i]);
        } else if (typeFilterData[i].offer.price >= PRICE.low &&
            typeFilterData[i].offer.price < PRICE.middle &&
            priceFilter.value === `middle`) {
          count++;
          priceFilterArray.push(typeFilterData[i]);
        } else if (typeFilterData[i].offer.price >= PRICE.middle && priceFilter.value === `high`) {
          count++;
          priceFilterArray.push(typeFilterData[i]);
        }
        if (count >= MAX_COUNT) {
          break;
        }
      }
    } else {
      priceFilterArray = typeFilterData;
    }

    if (roomsFilter.value !== `any`) {
      let count = 0;
      for (let i = 0; i < priceFilterArray.length; i++) {
        if (priceFilterArray[i].offer.rooms === parseInt(roomsFilter.value, 10)) {
          count++;
          roomsFilterArray.push(priceFilterArray[i]);
        }
        if (count >= MAX_COUNT) {
          break;
        }
      }
    } else {
      roomsFilterArray = priceFilterArray;
    }

    if (guestsFilter.value !== `any`) {
      let count = 0;
      for (let i = 0; i < roomsFilterArray.length; i++) {
        if (roomsFilterArray[i].offer.guests === parseInt(guestsFilter.value, 10)) {
          count++;
          guestsFilterArray.push(roomsFilterArray[i]);
        }
        if (count >= MAX_COUNT) {
          break;
        }
      }
    } else {
      guestsFilterArray = roomsFilterArray;
    }

    if (wifi.checked) {
      let count = 0;
      for (let i = 0; i < guestsFilterArray.length; i++) {
        if (guestsFilterArray[i].offer.features.indexOf(wifi.value) !== -1) {
          count++;
          wifiFilterArray.push(guestsFilterArray[i]);
        }
        if (count >= MAX_COUNT) {
          break;
        }
      }
    } else {
      wifiFilterArray = guestsFilterArray;
    }

    if (dishwasher.checked) {
      let count = 0;
      for (let i = 0; i < guestsFilterArray.length; i++) {
        if (guestsFilterArray[i].offer.features.indexOf(dishwasher.value) !== -1) {
          count++;
          dishwasherFilterArray.push(guestsFilterArray[i]);
        }
        if (count >= MAX_COUNT) {
          break;
        }
      }
    } else {
      dishwasherFilterArray = wifiFilterArray;
    }

    if (parking.checked) {
      let count = 0;
      for (let i = 0; i < guestsFilterArray.length; i++) {
        if (guestsFilterArray[i].offer.features.indexOf(parking.value) !== -1) {
          count++;
          parkingFilterArray.push(guestsFilterArray[i]);
        }
        if (count >= MAX_COUNT) {
          break;
        }
      }
    } else {
      parkingFilterArray = dishwasherFilterArray;
    }

    if (washer.checked) {
      let count = 0;
      for (let i = 0; i < guestsFilterArray.length; i++) {
        if (guestsFilterArray[i].offer.features.indexOf(washer.value) !== -1) {
          count++;
          washerFilterArray.push(guestsFilterArray[i]);
        }
        if (count >= MAX_COUNT) {
          break;
        }
      }
    } else {
      washerFilterArray = parkingFilterArray;
    }

    if (elevator.checked) {
      let count = 0;
      for (let i = 0; i < guestsFilterArray.length; i++) {
        if (guestsFilterArray[i].offer.features.indexOf(elevator.value) !== -1) {
          count++;
          elevatorFilterArray.push(guestsFilterArray[i]);
        }
        if (count >= MAX_COUNT) {
          break;
        }
      }
    } else {
      elevatorFilterArray = washerFilterArray;
    }

    if (conditioner.checked) {
      let count = 0;
      for (let i = 0; i < guestsFilterArray.length; i++) {
        if (guestsFilterArray[i].offer.features.indexOf(conditioner.value) !== -1) {
          count++;
          conditionerFilterArray.push(guestsFilterArray[i]);
        }
        if (count >= MAX_COUNT) {
          break;
        }
      }
    } else {
      conditionerFilterArray = elevatorFilterArray;
    }

    return conditionerFilterArray;
  };

  window.filters = {
    filters,
    filterData,
    addFiltersListeners,
    removeFiltersListeners
  };

})();
