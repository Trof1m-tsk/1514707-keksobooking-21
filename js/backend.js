"use strict";

(function () {
  const load = function (onLoad, onError) {
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;
    const xhr = new XMLHttpRequest;

    xhr.responseType = `json`;
    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, function () {
      onLoad(xhr.response);
      window.backend.data = xhr.response;
    });

    xhr.addEventListener(`error`, function () {
      onError(`Чёт пошло не так...`);
    });

    xhr.send();
  };

  window.backend = {
    load: load
  };

})()
