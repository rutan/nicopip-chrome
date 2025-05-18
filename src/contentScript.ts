import { EXTENSION_LABEL, TARGET_BUTTON_SELECTOR } from './constants';
import {
  copyButton,
  observeMissingButton,
  searchBaseButton,
  searchNicoPipButton,
} from './functions/button';
import { createRouter } from './functions/createRouter';
import { initPinP, startPinP } from './functions/pinp';
import PictureInPictureIcon from './svg/pinpIcon';

(() => {
  console.log('[nicopip] スクリプトの実行を開始します。');

  // ページにスクリプトを挿入
  // ※主にギフト画像の読み込み問題用。解消したら削除したい。
  const path = chrome.runtime.getURL('js/inject.js');
  const script = document.createElement('script');
  script.src = path;
  document.head.append(script);

  // 初期化処理
  async function setup() {
    // コピー元のボタンを取得
    const baseButton = await searchBaseButton({
      selector: TARGET_BUTTON_SELECTOR,
    });
    if (!baseButton) {
      console.log(
        '[PinP] ボタンが見つからなかったため処理を中断します。ページ構成が変更された可能性があります。',
      );
      return;
    }

    // 既に PinP ボタンが存在する場合は、処理を中断する
    // ボタンの取得は非同期なので、探したあとに確認する
    if (searchNicoPipButton()) return;

    // PinP の初期化
    initPinP();

    // PinP ボタンの追加
    const button = copyButton({
      srcButton: baseButton,
      title: EXTENSION_LABEL,
      icon: PictureInPictureIcon,
      onClick: startPinP,
    });

    // ボタン消去の監視
    // ページ遷移や DOM の変更でボタンが消えた場合、再度初期化処理を実行する
    observeMissingButton(button, () => {
      console.log('[PinP] ボタンが削除されたため、再度初期化処理を実行します');
      setup();
    });
  }

  // ルーティングの設定
  const router = createRouter();
  router.define('https://www.nicovideo.jp/watch/:id', setup);
  router.define('https://live.nicovideo.jp/watch/:id', setup);
  router.start();
})();
