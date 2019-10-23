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
