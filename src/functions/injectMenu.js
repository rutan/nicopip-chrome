export function injectMenu(targetElement, items = []) {
  const group = document.createElement('div');
  group.classList.add('VideoContextMenuContainer-group');
  items.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('VideoContextMenuContainer-item');
    element.innerText = item.name;
    element.addEventListener('click', item.onClick);
    group.appendChild(element);
  });
  targetElement.appendChild(group);
}
