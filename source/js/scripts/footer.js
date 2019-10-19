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

