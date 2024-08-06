interface CopyButtonParameter {
  srcButton: HTMLElement;
  title: string;
  icon: string;
  onClick: () => void;
}

export function copyButton({
  srcButton,
  title,
  icon,
  onClick,
}: CopyButtonParameter): HTMLElement {
  const cloneButton = srcButton.cloneNode(true) as HTMLElement;

  cloneButton.setAttribute('title', title);

  // ニコ動
  if (cloneButton.hasAttribute('data-title')) {
    cloneButton.setAttribute('data-title', title);
  }

  // ニコ生
  if (cloneButton.hasAttribute('aria-label')) {
    cloneButton.setAttribute('aria-label', title);
  }

  const iconImage = cloneButton.querySelector('svg, img');

  if (iconImage?.parentNode) {
    const parentNode = iconImage.parentNode as HTMLElement;
    parentNode.innerHTML = icon;

    const oldClassName = iconImage.getAttribute('class');
    if (oldClassName)
      parentNode.children[0].setAttribute('class', oldClassName);
  }

  cloneButton.addEventListener('click', () => {
    onClick();
  });

  if (srcButton.parentNode) {
    srcButton.parentNode.insertBefore(cloneButton, srcButton.nextSibling);
  }

  return cloneButton;
}
