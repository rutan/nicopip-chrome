export function copyButton(srcButton, title, icon, onClick) {
  if (!srcButton) {
    return;
  }

  const cloneButton = srcButton.cloneNode(true);

  // ニコ動
  if (cloneButton.hasAttribute('data-title')) {
    cloneButton.setAttribute('data-title', title);
  }

  // ニコ生
  if (cloneButton.hasAttribute('aria-label')) {
    cloneButton.setAttribute('aria-label', title);
  }

  const iconImage = cloneButton.querySelector('svg, img');

  if (iconImage) {
    iconImage.parentNode.innerHTML = icon;
  }

  cloneButton.addEventListener('click', () => {
    onClick();
  });

  srcButton.parentNode.insertBefore(cloneButton, srcButton.nextSibling);
}
