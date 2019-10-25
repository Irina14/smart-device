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
