'use strict';

(function () {
  // Открытие и закрытие блоков в футоре
  var footerBlock = document.querySelector('.footer__blocks');

  if (footerBlock) {
    var footerBlocks = footerBlock.querySelectorAll('.footer__block');

    footerBlock.classList.remove('footer__blocks--nojs');

    var closeBlocks = function () {
      Array.prototype.slice.call(footerBlocks).forEach(function (block) {
        block.classList.remove('footer__block--open');
      });
    };

    Array.prototype.slice.call(footerBlocks).forEach(function (block) {
      var footerButton = block.querySelector('.footer__button');
      footerButton.addEventListener('click', function () {
        if (block.classList.contains('footer__block--open')) {
          block.classList.remove('footer__block--open');
        } else {
          closeBlocks();
          block.classList.add('footer__block--open');
        }
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
    var fields = [userNameInput, userPhoneInput, questionTextarea, checkboxLabel];

    // Маска для поля ввода телефона
    var phoneMask = IMask(userPhoneInput, {
      mask: '+7(000)000-00-00'
    });

    // Проверка валидности номера телефона
    var validPhone = function (mask) {
      var reg = /^\d{10}$/;
      var phoneValue = mask.unmaskedValue;
      var valid = reg.test(phoneValue);
      return valid;
    };

    // Создание сообщения об ошибке
    var createMessage = function (text, field, classError) {
      var message = document.createElement('span');
      message.classList.add(classError);
      field.appendChild(message);
      message.textContent = text;
    };

    // Удаление сообщения об ошибке
    var removeMessage = function (field, selectorError) {
      var errorText = field.querySelector(selectorError);
      if (errorText) {
        field.removeChild(errorText);
      }
    };

    // Проверка валидности поля
    var validField = function (field) {
      if (!field.validity.valid) {
        field.classList.add('form__error');
      } else {
        field.classList.remove('form__error');
      }
    };

    // Удаление рамки ошибки
    var removeError = function (arrayFields, classError) {
      arrayFields.forEach(function (field) {
        if (field.classList.contains(classError)) {
          field.classList.remove(classError);
        }
      });
    };

    var formButtonClickHandler = function (evt) {
      validField(userNameInput);
      validField(userPhoneInput);

      if (userPhoneInput.validity.valid && !validPhone(phoneMask)) {
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

    var documentClickHandler = function (evt) {
      if (evt.target !== formButton) {
        removeError(fields, 'form__error');
        removeMessage(fieldPhone, '.form__error-text');
      }
    };

    formButton.addEventListener('click', formButtonClickHandler);
    document.addEventListener('click', documentClickHandler);

    window.form = {
      createMessage: createMessage,
      removeMessage: removeMessage,
      validPhone: validPhone,
      removeError: removeError
    };
  }
})();

'use strict';

(function () {
  // Плавный переход по якорной ссылке
  var mainScreenButton = document.querySelector('.main-screen__button');

  if (mainScreenButton) {

    $(document).ready(function () {
      $('.main-screen__button').on('click', function (evt) {
        evt.preventDefault();
        var id = $(this).attr('href');
        var top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 2000);
      });
    });
  }

  var mainScreenLink = document.querySelector('.main-screen__link');

  if (mainScreenLink) {
    $(document).ready(function () {
      $('.main-screen__link').on('click', function (evt) {
        evt.preventDefault();
        var id = $(this).attr('href');
        var top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
      });
    });
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
    var popupOverlay = document.querySelector('.popup-overlay');
    var userNameInput = popup.querySelector('#user-name-popup');
    var userPhoneInput = popup.querySelector('#user-phone-popup');
    var questionTextarea = popup.querySelector('#question-popup');
    var checkbox = popup.querySelector('#consent-popup');
    var checkboxLabel = popup.querySelector('.popup__checkbox label');
    var fieldPhone = popup.querySelector('.popup__field--phone');
    var popupButton = popup.querySelector('.popup__button');
    var fields = [userNameInput, userPhoneInput, questionTextarea, checkboxLabel];
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
      popupOverlay.classList.remove('popup-overlay--open');
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
      popupOverlay.classList.add('popup-overlay--open');
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

    popup.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });

    popupOverlay.addEventListener('click', function () {
      closePopup();
    });

    // Маска для поля ввода телефона
    var phoneMask = IMask(userPhoneInput, {
      mask: '+7(000)000-00-00'
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

      if (userPhoneInput.validity.valid && !window.form.validPhone(phoneMask)) {
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

    var popupClickHandler = function (evt) {
      if (evt.target !== popupButton) {
        window.form.removeError(fields, 'popup__error');
        window.form.removeMessage(fieldPhone, '.popup__error-text');
      }
    };

    popupButton.addEventListener('click', popupButtonClickHandler);
    popup.addEventListener('click', popupClickHandler);
  }
})();

//# sourceMappingURL=main.js.map
