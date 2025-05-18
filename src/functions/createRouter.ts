export type Routing = {
  pattern: URLPattern;
  handler: (url: URL) => void;
};

export function createRouter() {
  const routes: Routing[] = [];
  return {
    define(pattern: string, handler: (url: URL) => void) {
      const urlPattern = new URLPattern(pattern);
      routes.push({ pattern: urlPattern, handler });
    },
    exec(url: URL) {
      for (const route of routes) {
        if (route.pattern.test(url)) {
          route.handler(url);
          return true;
        }
      }
      return false;
    },
    start() {
      window.navigation.addEventListener('navigate', (e) => {
        console.log('Navigation happened:', e.destination.url);
        this.exec(new URL(e.destination.url));
      });
      this.exec(new URL(window.location.href));
    },
  };
}
