import { copyButton } from './functions/copyButton';
import { initPinP, startPinP } from './functions/pinp';
import PictureInPictureIcon from './svg/pinpIcon';

const TITLE = 'Picture in Picture';

const fullScreenButton = document.querySelector(
  '.ControllerContainer .EnableFullScreenButton, [class^=___addon-controller___] [class^=___fullscreen-button___]'
);

if (fullScreenButton) {
  initPinP();
  // フルスクボタンをコピーしPinPボタンにする
  copyButton(fullScreenButton, TITLE, PictureInPictureIcon, startPinP);
}
