'use strict';

(function () {
  // Валидация формы
  var form = document.querySelector('.form__question');

  if (form) {
    var userNameInput = form.querySelector('#user-name');
    var userPhoneInput = form.querySelector('#user-phone');
    var questionTextarea = form.querySelector('#question');
    var checkboxLabel = form.querySelector('.form__checkbox label');
    var checkbox = form.querySelector('#consent');
    var fieldPhone = form.querySelector('.form__field--phone');
    var formButton = form.querySelector('button[type="submit"]');

    // Создание сообщения об ошибки
    var createMessage = function (text, field) {
      var message = document.createElement('span');
      message.classList.add('form__error-text');
      field.appendChild(message);
      message.textContent = text;
    };

    // Удаление сообщения об ошибке
    var removeMessage = function (field) {
      var errorText = field.querySelector('.form__error-text');
      if (errorText) {
        field.removeChild(errorText);
      }
    };

    // Проверка валидности номера телефона
    var validPhone = function () {
      var reg = /^\d[\d\(\)\ -]{4,14}\d$/;
      var phoneValue = userPhoneInput.value;
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

      if (userPhoneInput.validity.valid && !validPhone()) {
        evt.preventDefault();
        userPhoneInput.classList.add('form__error');
        createMessage('Неккоректный телефон', fieldPhone);
      } else {
        evt.returnValue = true;
        removeMessage(fieldPhone);
      }

      validField(questionTextarea);

      if (!checkbox.checked) {
        checkboxLabel.classList.add('form__error');
      } else {
        checkboxLabel.classList.remove('form__error');
      }
    };

    formButton.addEventListener('click', formButtonClickHandler);
  }
})();
