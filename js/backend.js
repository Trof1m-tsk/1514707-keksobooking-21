"use strict";

(function () {
  const getURL = `https://21.javascript.pages.academy/keksobooking/data`;
  const postURL = `https://21.javascript.pages.academy/keksobooking`;
  const sendErrorMessage = `Не удаётся зарегистрировать объявление`;
  const loadErrorMessage = `Не удаётся загрузить данные`;

  const load = function (onError) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.open(`GET`, getURL);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        window.backend.serverData = xhr.response;
        window.backend.data = xhr.response;
        window.render.renderPinsOnMap(xhr.response);
      } else {
        onError(loadErrorMessage);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(loadErrorMessage);
    });

    xhr.send();
  };

  const send = function (formData, onLoad, onError) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError(sendErrorMessage);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(sendErrorMessage);
    });

    xhr.open(`POST`, postURL);
    xhr.send(formData);
  };

  const filterData = function (housingType) {
    let filteredData;
    if (housingType === `any`) {
      filteredData = window.backend.serverData;
    } else {
      filteredData = window.backend.serverData.filter(function (item) {
        return item.offer.type === housingType;
      });
    }
    window.backend.data = filteredData;

    return filteredData;
  };

  window.backend = {
    load: load,
    send: send,
    filterData: filterData
  };

})();
