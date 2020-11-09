"use strict";

(function () {
  const housingTypeFilter = document.querySelector(`#housing-type`);
  let filteredData;

  const filterData = function (data) {

    filteredData = (housingTypeFilter.value === `any`) ?
      data :
      data.filter(function (item) {
        return item.offer.type === housingTypeFilter.value;
      });

    return filteredData;
  };

  window.filters = {
    filterData: filterData
  };

})();
