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

export type routeNicoVideoParams = {
  mode: 'canvas' | 'document';
};

export async function routeNicoVideo(params: routeNicoVideoParams) {
  setupNicoVideo(params);
}

async function setupNicoVideo({ mode }: routeNicoVideoParams) {
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
    onClick: mode === 'document' ? openDocumentPictureInPicture : startPinP,
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
    setupNicoVideo({ mode });
  });
}

async function openDocumentPictureInPicture() {
  const el = document.querySelector('[data-name="stage"]');
  const parent = el?.parentElement;
  if (!el || !parent) {
    alert(
      '[nicopip] プレーヤーのHTMLが見つからなかった、ニコ動の仕様変わったかも＞＜',
    );
    return;
  }

  const dummyElement = document.createElement('div');
  dummyElement.style.display = 'block';
  dummyElement.style.width = '100%';
  dummyElement.style.aspectRatio = '16 / 9';
  dummyElement.style.backgroundColor = '#000000';
  parent.append(dummyElement);

  // biome-ignore lint/suspicious/noExplicitAny: 非標準
  const win = window as any;
  const pipWindow = await win.documentPictureInPicture.requestWindow({
    width: el.clientWidth / 2,
    height: el.clientHeight / 2,
  });
  pipWindow.addEventListener('unload', () => {
    parent.append(el);
    dummyElement.remove();
  });
  pipWindow.document.body.style.margin = '0';
  pipWindow.document.body.style.backgroundColor = '#000000';
  pipWindow.document.body.style.overflow = 'hidden';

  const wrapper = document.createElement('div');
  wrapper.style.width = '100%';
  wrapper.style.height = '100%';
  wrapper.append(el);

  // 画面クリックで再生・一時停止できるようにカバーを追加
  const cover = document.createElement('div');
  cover.style.position = 'absolute';
  cover.style.top = '0';
  cover.style.left = '0';
  cover.style.width = '100%';
  cover.style.height = '100%';
  cover.addEventListener('click', () => {
    const playButton = document.querySelector<HTMLElement>(
      '[aria-label="再生する"],[aria-label="一時停止する"]',
    );
    playButton?.click();
  });
  wrapper.append(cover);

  pipWindow.document.body.append(wrapper);
}
