// ニコ生のギフト描画用
// AkashicのCanvasが汚染されることを防ぐため、必要に応じて自動的に corssOrigin="anonymous" を付与する
(() => {
  const ANONYMOUS_IMAGE_URLS = [
    // Akashic
    'https://resource.akashic.coe.nicovideo.jp/',
    // ギフト
    'https://ir.cdn.nimg.jp/',
    // エモーション
    'https://secure-dcdn.cdn.nimg.jp/nicoad/',
  ];

  class AutoAnonymousImage extends Image {
    get src() {
      return super.src;
    }

    set src(value: string) {
      super.src = value;
      if (ANONYMOUS_IMAGE_URLS.some((url) => value.startsWith(url))) {
        this.crossOrigin = 'anonymous';
      }
    }
  }

  window.Image = new Proxy(window.Image, {
    construct: (_target, args) => new AutoAnonymousImage(...args),
  });
})();
