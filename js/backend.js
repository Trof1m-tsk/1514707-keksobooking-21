"use strict";

(function () {
  const URL = {
    load: `https://21.javascript.pages.academy/keksobooking/data`,
    upload: `https://21.javascript.pages.academy/keksobooking`
  };

  const SENDING_ERR_MESSAGE = `Не удаётся зарегистрировать объявление`;
  const LOADING_ERR_MESSAGE = `Не удаётся загрузить данные`;
  const LOADING_ERR_BUTTON_TEXT = `Понятно`;
  const TIMEOUT = 5000;

  const load = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.open(`GET`, URL.load);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(LOADING_ERR_MESSAGE, LOADING_ERR_BUTTON_TEXT);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(LOADING_ERR_MESSAGE, LOADING_ERR_BUTTON_TEXT);
    });

    xhr.send();
  };

  const upload = function (data, onLoad, onError) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError(SENDING_ERR_MESSAGE);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(SENDING_ERR_MESSAGE);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Время ожидания ${xhr.timeout} превышено.`);
    });

    xhr.timeout = TIMEOUT;

    xhr.open(`POST`, URL.upload);
    xhr.send(data);
  };

  window.backend = {
    load,
    upload
  };

})();
