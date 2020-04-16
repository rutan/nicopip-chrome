import { copyButton } from './functions/copyButton';
import { initPinP, startPinP } from './functions/pinp';
import PictureInPictureIcon from './svg/pinpIcon';

const TITLE = '[非公式] PinP';

const fullScreenButton = document.querySelector(
  '.ControllerContainer .EnableFullScreenButton, [class^=___addon-controller___] [class^=___fullscreen-button___]'
);

if (fullScreenButton) {
  initPinP();
  // フルスクボタンをコピーしPinPボタンにする
  copyButton(fullScreenButton, TITLE, PictureInPictureIcon, startPinP);
}
