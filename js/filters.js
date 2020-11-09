"use strict";

(function () {
  const housingTypeFilter = document.querySelector(`#housing-type`);
  let initialData;
  let filteredData;

  const filterData = function (initialData) {

    housingTypeFilter.value === `any` ?
      filteredData = initialData :
      filteredData = initialData.filter(function (item) {
        return item.offer.type === housingTypeFilter.value;
      });

    return filteredData;
  };

  window.filters = {
    filterData: filterData,
    initialData: initialData
  };

})();
