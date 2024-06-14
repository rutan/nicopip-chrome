import { EXTENSION_LABEL, TARGET_BUTTON_SELECTOR, VIDEO_TAG_SELECTOR } from './constants';
import { copyButton } from './functions/copyButton';
import { initPinP, startPinP } from './functions/pinp';
import PictureInPictureIcon from './svg/pinpIcon';

(() => {
  // ページにスクリプトを挿入
  // ※主にギフト画像の読み込み問題用。解消したら削除したい。
  const path = chrome.runtime.getURL('js/inject.js');
  const script = document.createElement('script');
  script.src = path;
  document.head.append(script);

  let count = 0;
  const checkPinPButton = setInterval(function () {
    const targetButtons = document.querySelectorAll<HTMLElement>(TARGET_BUTTON_SELECTOR);
    if (targetButtons.length === 0) {
      // 一定回数チェックして見つからなかったらページ構造が変わったと判断して終了
      ++count;
      if (count > 15) clearInterval(checkPinPButton);
      return;
    }

    // PinPの初期化
    initPinP();

    // ボタンをコピーしPinPボタンにする
    const targetButton = targetButtons[targetButtons.length - 1];
    copyButton({
      srcButton: targetButton,
      title: EXTENSION_LABEL,
      icon: PictureInPictureIcon,
      onClick: startPinP,
    });

    // videoのPinP操作からstartPinPを呼び出すようにする
    const video = document.querySelector<HTMLVideoElement>(VIDEO_TAG_SELECTOR);
    if (video) {
      video.disablePictureInPicture = false;
      video.addEventListener('enterpictureinpicture', (e) => {
        e.preventDefault();
        startPinP();
      });
    }

    clearInterval(checkPinPButton);
  }, 500);
})();
