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

  // videoのPinP操作からstartPinPを呼び出すようにする
  const video = document.querySelector<HTMLVideoElement>('#MainVideoPlayer video, [class^=___video-layer___] video');
  if (video) {
    video.disablePictureInPicture = false;
    video.addEventListener('enterpictureinpicture', (e) => {
      e.preventDefault();
      startPinP();
    });
  }

  clearInterval(checkPinPButton);
}, 500);
