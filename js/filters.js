"use strict";

(function () {
  const filters = document.querySelector(`.map__filters`);
  const typeFilter = document.querySelector(`#housing-type`);
  const priceFilter = document.querySelector(`#housing-price`);
  const roomsFilter = document.querySelector(`#housing-rooms`);
  const guestsFilter = document.querySelector(`#housing-guests`);
  const featuresFilter = document.querySelector(`#housing-features`);
  const featuresCheckboxes = featuresFilter.querySelectorAll(`.map__checkbox`);

  const onFilterChange = window.debounce(function () {
    window.pins.updatePins();
  });

  const addFiltersListeners = function () {
    filters.addEventListener(`change`, onFilterChange);
  };

  const removeFiltersListeners = function () {
    filters.removeEventListener(`change`, onFilterChange);
  };

  const filterData = function (data) {
    let filteredData = (typeFilter.value === `any`) ?
      data :


      data.filter(function (item) {
        return item.offer.type === typeFilter.value;
      });

    switch (priceFilter.value) {
      case `low`:
        filteredData = filteredData.filter(function (item) {
          return item.offer.price < 10000;
        });
        break;
      case `middle`:
        filteredData = filteredData.filter(function (item) {
          return item.offer.price >= 10000 && item.offer.price < 50000;
        });
        break;
      case `high`:
        filteredData = filteredData.filter(function (item) {
          return item.offer.price > 50000;
        });
        break;
    }

    if (roomsFilter.value !== `any`) {
      filteredData = filteredData.filter(function (item) {
        return item.offer.rooms === parseInt(roomsFilter.value);
      });
    }

    if (guestsFilter.value !== `any`) {
      filteredData = filteredData.filter(function (item) {
        return item.offer.guests === parseInt(guestsFilter.value, 10);
      });
    }

    featuresCheckboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        filteredData = filteredData.filter(function (item) {
          return item.offer.features.indexOf(checkbox.value, 10) !== -1;
        });
      }

      return filteredData;
    });

    return filteredData;
  };

  window.filters = {
    filterData,
    addFiltersListeners,
    removeFiltersListeners
  };

})();
