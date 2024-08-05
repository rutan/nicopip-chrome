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

  const checkPinPButton = (() => {
    let count = 0;
    let isSetupVideo = false;

    const func = () => {
      const targetButtons = document.querySelectorAll<HTMLElement>(TARGET_BUTTON_SELECTOR);
      if (targetButtons.length === 0) {
        ++count;

        // 一定回数以下だったら時間を開けてリトライする
        if (count < 15) {
          window.setTimeout(func, 500);
          return;
        }

        // それ以上だったらページ構造が変わったと判断して終了
        console.log('[nicopip] ページ内からボタンを検知できなかったため終了します');
        return;
      }

      // カウンターをリセット
      count = 0;

      // PinPの初期化
      initPinP();

      // ボタンをコピーしPinPボタンにする
      const targetButton = targetButtons[targetButtons.length - 1];
      const newButton = copyButton({
        srcButton: targetButton,
        title: EXTENSION_LABEL,
        icon: PictureInPictureIcon,
        onClick: startPinP,
      });

      // ボタン消去の監視
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type !== 'childList') return;
          mutation.removedNodes.forEach((node) => {
            if (!node.contains(newButton)) return;
            console.log('[nicopip] ボタンが削除されたため、再度ボタンを作成します');
            observer.disconnect();
            window.setTimeout(func, 100);
            return;
          });
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });

      // videoのPinP操作からstartPinPを呼び出すようにする
      if (!isSetupVideo) {
        const video = document.querySelector<HTMLVideoElement>(VIDEO_TAG_SELECTOR);
        if (video) {
          isSetupVideo = true;
          video.disablePictureInPicture = false;
          video.addEventListener('enterpictureinpicture', (e) => {
            e.preventDefault();
            startPinP();
          });
        }
      }
    };
    return func;
  })();

  checkPinPButton();
})();
