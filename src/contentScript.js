import { injectMenu } from './functions/injectMenu';
import { initPinP, startPinP } from './functions/pinp';

(() => {
  const menu = [
    {
      name: '[非公式] PinPで表示する',
      onClick: startPinP
    }
  ];
  const target = document.querySelector('.WatchAppContainer');
  const observer = new MutationObserver(records => {
    records.forEach(record => {
      const node = record.addedNodes[0];
      if (!node) return;
      if (node.className != 'ContextMenu-wrapper') return;
      const list = node.querySelector('.VideoContextMenuContainer');
      if (!list) return;
      initPinP();
      injectMenu(list, menu);
    });
  });
  observer.observe(target, { childList: true });
})();
