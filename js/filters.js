"use strict";

(function () {
  const housingTypeFilter = document.querySelector(`#housing-type`);

  const filterData = function () {
    let filteredData;

    if (housingTypeFilter.value === `any`) {
      filteredData = window.backend.data;
    } else {
      filteredData = window.backend.data.filter(function (item) {
        return item.offer.type === housingTypeFilter.value;
      });
    }

    return filteredData;
  };

  window.filters = {
    filterData: filterData
  };

})();
