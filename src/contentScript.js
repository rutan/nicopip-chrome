import { copyButton } from './functions/copyButton';
import { initPinP, startPinP } from './functions/pinp';
import PictureInPictureIcon from './svg/pinpIcon';

const TITLE = '[非公式] PinP';

const checkPinPButton = setInterval(function() {
  var fullScreenButton = document.querySelector(
    '.ControllerContainer .EnableFullScreenButton, [class^=___addon-controller___] [class^=___fullscreen-button___]'
  );

  if (fullScreenButton != null) {
    initPinP();
    // フルスクボタンをコピーしPinPボタンにする
    copyButton(fullScreenButton, TITLE, PictureInPictureIcon, startPinP);
    clearInterval(checkPinPButton);
  }
}, 500);
