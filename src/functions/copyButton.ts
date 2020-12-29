interface CopyButtonParameter {
  srcButton: HTMLElement;
  title: string;
  icon: string;
  onClick: () => void;
}

export function copyButton({ srcButton, title, icon, onClick }: CopyButtonParameter): void {
  const cloneButton = srcButton.cloneNode(true) as HTMLElement;

  // ニコ動
  if (cloneButton.hasAttribute('data-title')) {
    cloneButton.setAttribute('data-title', title);
  }

  // ニコ生
  if (cloneButton.hasAttribute('aria-label')) {
    cloneButton.setAttribute('aria-label', title);
  }

  const iconImage = cloneButton.querySelector('svg, img');

  if (iconImage && iconImage.parentNode) {
    (iconImage.parentNode as HTMLElement).innerHTML = icon;
  }

  cloneButton.addEventListener('click', () => {
    onClick();
  });

  if (srcButton.parentNode) {
    srcButton.parentNode.insertBefore(cloneButton, srcButton.nextSibling);
  }
}
