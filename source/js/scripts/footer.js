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

