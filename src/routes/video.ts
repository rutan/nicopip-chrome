import { EXTENSION_LABEL, TARGET_BUTTON_SELECTOR } from '../constants';
import {
  copyButton,
  initPinP,
  observeMissingButton,
  searchBaseButton,
  searchNicoPipButton,
  startPinP,
} from '../functions';
import { PictureInPictureIcon } from '../svg';

export async function routeNicoVideo() {
  setupNicoVideo();
}

async function setupNicoVideo() {
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

  // PinP ボタンを追加
  const button = copyButton({
    srcButton: baseButton,
    onClick: startPinP,
  }) as HTMLButtonElement;
  button.setAttribute('aria-label', EXTENSION_LABEL);

  // 読み込み中はdisable表示になっている可能性が高いためリセットする
  button.className = 'Pressable cursor_pointer';
  button.disabled = false;

  // PinPボタンのアイコンを設定
  const originalSvg = button.querySelector('svg');
  if (originalSvg) {
    originalSvg.classList.add(
      'fill_icon.watchControllerBase',
      'hover:fill_icon.watchControllerHover',
    );
    originalSvg.classList.remove('fill_icon.watchControllerDisabled');

    button.innerHTML = PictureInPictureIcon;
    button.children[0].setAttribute(
      'class',
      originalSvg.getAttribute('class') ?? '',
    );
  }

  // ボタン消去の監視
  // ページ遷移や DOM の変更でボタンが消えた場合、再度初期化処理を実行する
  observeMissingButton(button, () => {
    console.log('[nicopip] ボタンが削除されたため、再度初期化処理を実行します');
    setupNicoVideo();
  });
}
