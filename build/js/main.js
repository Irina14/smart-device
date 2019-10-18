'use strict';

(function () {
  // Открытие и закрытие блоков в футоре
  var footerBlock = document.querySelector('.footer__blocks');

  if (footerBlock) {
    var footerBlocks = footerBlock.querySelectorAll('.footer__block');

    footerBlock.classList.remove('footer__blocks--nojs');

    Array.prototype.slice.call(footerBlocks).forEach(function (block) {
      var footerButton = block.querySelector('.footer__button');
      footerButton.addEventListener('click', function () {
        block.classList.toggle('footer__block--open');
      });
    });
  }
})();


'use strict';

(function () {
  var form = document.querySelector('.form__question');

  if (form) {
    var userNameInput = form.querySelector('#user-name');
    var userPhoneInput = form.querySelector('#user-phone');
    var questionTextarea = form.querySelector('#question');
    var checkbox = form.querySelector('#consent');
    var checkboxLabel = form.querySelector('.form__checkbox label');
    var fieldPhone = form.querySelector('.form__field--phone');
    var formButton = form.querySelector('.form__button');

    // Создание сообщения об ошибке
    var createMessage = function (text, field, classError) {
      var message = document.createElement('span');
      message.classList.add(classError);
      field.appendChild(message);
      message.textContent = text;
    };

    // Удаление сообщения об ошибке
    var removeMessage = function (field, selector) {
      var errorText = field.querySelector(selector);
      if (errorText) {
        field.removeChild(errorText);
      }
    };

    // Проверка валидности номера телефона
    var validPhone = function (input) {
      var reg = /^\d[\d\(\)\ -]{4,14}\d$/;
      var phoneValue = input.value;
      var valid = reg.test(phoneValue);
      return valid;
    };

    // Проверка валидности поля
    var validField = function (field) {
      if (!field.validity.valid) {
        field.classList.add('form__error');
      } else {
        field.classList.remove('form__error');
      }
    };

    var formButtonClickHandler = function (evt) {
      validField(userNameInput);
      validField(userPhoneInput);

      if (userPhoneInput.validity.valid && !validPhone(userPhoneInput)) {
        evt.preventDefault();
        userPhoneInput.classList.add('form__error');
        if (!fieldPhone.querySelector('.form__error-text')) {
          createMessage('Неккоректный телефон', fieldPhone, 'form__error-text');
        }
      } else {
        evt.returnValue = true;
        removeMessage(fieldPhone, '.form__error-text');
      }

      validField(questionTextarea);

      if (!checkbox.checked) {
        checkboxLabel.classList.add('form__error');
      } else {
        checkboxLabel.classList.remove('form__error');
      }
    };

    formButton.addEventListener('click', formButtonClickHandler);

    window.form = {
      createMessage: createMessage,
      removeMessage: removeMessage,
      validPhone: validPhone
    };
  }
})();

'use strict';

(function () {
  var popup = document.querySelector('.popup');

  if (popup) {
    var ESC_KEYCODE = 27;
    var body = document.querySelector('body');
    var headerButton = document.querySelector('.header__button');
    var popupClose = popup.querySelector('.popup__close');
    var popupOverlay = popup.querySelector('.popup__overlay');
    var userNameInput = popup.querySelector('#user-name-popup');
    var userPhoneInput = popup.querySelector('#user-phone-popup');
    var questionTextarea = popup.querySelector('#question-popup');
    var checkbox = popup.querySelector('#consent-popup');
    var checkboxLabel = popup.querySelector('.popup__checkbox label');
    var fieldPhone = popup.querySelector('.popup__field--phone');
    var popupButton = popup.querySelector('.popup__button');
    var isStorageSupport = true;
    var storageName = '';
    var storagePhone = '';
    var storageQuestion = '';

    try {
      storageName = localStorage.getItem('name');
      storagePhone = localStorage.getItem('phone');
      storageQuestion = localStorage.getItem('question');
    } catch (err) {
      isStorageSupport = false;
    }

    // Открытие и закрытие попап
    var closePopup = function () {
      popup.classList.remove('popup--open');
      body.classList.remove('popup-open-body');
      document.removeEventListener('keydown', documentEscKeyHandler);
    };

    var documentEscKeyHandler = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup();
      }
    };

    headerButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      popup.classList.add('popup--open');
      body.classList.add('popup-open-body');
      userNameInput.focus();
      document.addEventListener('keydown', documentEscKeyHandler);

      if (storageName || storagePhone || storageQuestion) {
        userNameInput.value = storageName;
        userPhoneInput.value = storagePhone;
        questionTextarea.value = storageQuestion;
      }
    });

    popupClose.addEventListener('click', function () {
      closePopup();
    });

    popupOverlay.addEventListener('click', function () {
      closePopup();
    });

    // Валидация формы
    var validField = function (field, key) {
      if (!field.validity.valid) {
        field.classList.add('popup__error');
      } else {
        field.classList.remove('popup__error');
        if (isStorageSupport) {
          localStorage.setItem(key, field.value);
        }
      }
    };

    var popupButtonClickHandler = function (evt) {
      validField(userNameInput, 'name');
      validField(userPhoneInput, 'phone');

      if (userPhoneInput.validity.valid && !window.form.validPhone(userPhoneInput)) {
        evt.preventDefault();
        userPhoneInput.classList.add('popup__error');
        if (!fieldPhone.querySelector('.popup__error-text')) {
          window.form.createMessage('Неккоректный телефон', fieldPhone, 'popup__error-text');
        }
      } else {
        evt.returnValue = true;
        window.form.removeMessage(fieldPhone, '.popup__error-text');
        if (isStorageSupport) {
          localStorage.setItem('phone-popup', userPhoneInput.value);
        }
      }

      validField(questionTextarea, 'question');

      if (!checkbox.checked) {
        checkboxLabel.classList.add('popup__error');
      } else {
        checkboxLabel.classList.remove('popup__error');
      }
    };

    popupButton.addEventListener('click', popupButtonClickHandler);
  }
})();

//# sourceMappingURL=main.js.map
