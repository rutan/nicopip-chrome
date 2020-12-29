import { copyButton } from './functions/copyButton';
import { initPinP, startPinP } from './functions/pinp';
import PictureInPictureIcon from './svg/pinpIcon';

const TITLE = '[非公式] PinP';

const checkPinPButton = setInterval(function () {
  const fullScreenButton = document.querySelector<HTMLElement>(
    '.ControllerContainer .EnableFullScreenButton, [class^=___addon-controller___] [class^=___fullscreen-button___]'
  );
  if (!fullScreenButton) return;

  initPinP();

  // フルスクボタンをコピーしPinPボタンにする
  copyButton({
    srcButton: fullScreenButton,
    title: TITLE,
    icon: PictureInPictureIcon,
    onClick: startPinP,
  });

  clearInterval(checkPinPButton);
}, 500);
