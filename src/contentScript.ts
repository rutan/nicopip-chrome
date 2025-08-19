import { createRouter } from './functions/createRouter';
import { routeNicoLive, routeNicoVideo } from './routes';

(() => {
  console.log('[nicopip] スクリプトの実行を開始します。');

  // ルーティングの設定
  const router = createRouter();
  router.define('https://www.nicovideo.jp/watch/:id', routeNicoVideo);
  router.define('https://live.nicovideo.jp/watch/:id', routeNicoLive);
  router.start();
})();
