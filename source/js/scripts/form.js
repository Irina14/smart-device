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
