import { EXTENSION_LABEL, TARGET_BUTTON_SELECTOR } from '../constants';
import {
  copyButton,
  initPinP,
  observeMissingButton,
  searchBaseButton,
  searchNicoPipButton,
  startPinP,
} from '../functions';
import injectUrl from '../inject?script';
import { PictureInPictureIcon } from '../svg';

export async function routeNicoLive() {
  injectScriptAndStyle();
  setupNicoLive();
}

async function setupNicoLive() {
  // コピー元のボタンを取得
  const baseButton = await searchBaseButton({
    selector: TARGET_BUTTON_SELECTOR,
  });
  if (!baseButton) {
    console.log(
      '[nicopip] ボタンが見つからなかったため処理を中断します。ページ構成が変更された可能性があります。',
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
    onClick: startPinP,
  });
  button.setAttribute('aria-label', EXTENSION_LABEL);

  // ボタン消去の監視
  // ページ遷移や DOM の変更でボタンが消えた場合、再度初期化処理を実行する
  observeMissingButton(button, () => {
    console.log('[nicopip] ボタンが削除されたため、再度初期化処理を実行します');
    setupNicoLive();
  });
}

const injectScriptAndStyle = (() => {
  let injected = false;
  return () => {
    if (injected) return;
    injected = true;

    // ページにスクリプトを挿入
    // ※主にギフト画像の読み込み問題用。解消したら削除したい。
    const path = chrome.runtime.getURL(injectUrl);
    const script = document.createElement('script');
    script.src = path;
    document.head.append(script);

    // スタイル用のクラスを追加
    const style = document.createElement('style');
    style.setAttribute('data-nicopip-style', 'true');
    style.textContent = `
      [data-nicopip-button="true"] {
        --icon-url: url("data:image/svg+xml;utf8,${encodeURIComponent(PictureInPictureIcon)}") !important;
      }
    `;
    document.head.append(style);
  };
})();
