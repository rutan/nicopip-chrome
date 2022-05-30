(() => {
  const cdnNimgJpPattern = /^https:\/\/[^.]+\.cdn\.nimg\.jp\//;

  class AutoAnonymousImage extends Image {
    get src() {
      return super.src;
    }

    set src(value: string) {
      super.src = value;
      if (value && value.match(cdnNimgJpPattern)) {
        this.crossOrigin = 'anonymous';
      }
    }
  }

  window.Image = new Proxy(window.Image, {
    construct: function (target, args) {
      return new AutoAnonymousImage(...args);
    },
  });
})();
