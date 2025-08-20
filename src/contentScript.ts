import { getSettings } from './functions';
import { createRouter } from './functions/createRouter';
import { routeNicoLive, routeNicoVideo } from './routes';

(async () => {
  console.log('[nicopip] スクリプトの実行を開始します。');

  const settings = await getSettings();

  // ルーティングの設定
  const router = createRouter();

  if (settings.nicoVideo !== 'disabled') {
    router.define('https://www.nicovideo.jp/watch/:id', routeNicoVideo);
  }

  if (settings.nicoLive !== 'disabled') {
    router.define('https://live.nicovideo.jp/watch/:id', routeNicoLive);
  }

  router.start();
})();
