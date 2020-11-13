"use strict";

(function () {
  const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const POST_URL = `https://21.javascript.pages.academy/keksobooking`;
  const SENDING_ERR_MESSAGE = `Не удаётся зарегистрировать объявление`;
  const LOADING_ERR_MESSAGE = `Не удаётся загрузить данные`;

  const load = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.open(`GET`, GET_URL);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(LOADING_ERR_MESSAGE);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(LOADING_ERR_MESSAGE);
    });

    xhr.send();
  };

  const send = function (form, onLoad, onError) {
    const xhr = new XMLHttpRequest();
    const data = new FormData(form);

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

    xhr.open(`POST`, POST_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };

})();
