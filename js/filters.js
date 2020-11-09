"use strict";

(function () {
  const housingTypeFilter = document.querySelector(`#housing-type`);
  let data;
  let filteredData;

  const filterData = function (data) {

    (housingTypeFilter.value === `any`) ?
        filteredData = data :
        filteredData = data.filter(function (item) {
          return item.offer.type === housingTypeFilter.value;
        });

    return filteredData;
  };

  window.filters = {
    filterData: filterData,
    data: data
  };

})();
