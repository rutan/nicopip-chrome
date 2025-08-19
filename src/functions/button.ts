export function copyButton({
  srcButton,
  onClick,
}: {
  srcButton: HTMLElement;
  onClick: () => void;
}) {
  const cloneButton = srcButton.cloneNode(true) as HTMLElement;

  cloneButton.id = '';
  cloneButton.setAttribute('data-nicopip-button', 'true');

  cloneButton.addEventListener('click', onClick);

  if (srcButton.parentNode) {
    srcButton.parentNode.insertBefore(cloneButton, srcButton.nextSibling);
  }

  return cloneButton;
}

export function searchNicoPipButton() {
  return document.querySelector<HTMLElement>('[data-nicopip-button]');
}

export async function searchBaseButton({
  selector,
  retryCount = 15,
}: {
  selector: string;
  retryCount?: number;
}): Promise<HTMLElement | null> {
  let count = 0;
  while (true) {
    const targetButtons = document.querySelectorAll<HTMLElement>(selector);
    if (targetButtons.length > 0) {
      return targetButtons[targetButtons.length - 1];
    }

    ++count;
    if (count > retryCount) {
      console.log(
        '[nicopip] ページ内からボタンを検知できなかったため終了します',
      );
      return null;
    }

    // まだボタンが見つからない場合は、少し待ってから再度チェック
    await sleep(500);
  }
}

export async function observeMissingButton(
  button: HTMLElement,
  callback: () => void,
) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type !== 'childList') return;

      mutation.removedNodes.forEach((node) => {
        if (!node.contains(button)) return;
        observer.disconnect();
        window.setTimeout(callback, 100);
        return;
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
