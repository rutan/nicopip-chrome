import { crx, defineManifest } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';
import { description, name, version } from './package.json';

export default defineConfig({
  plugins: [
    crx({
      manifest: defineManifest({
        manifest_version: 3,
        name,
        version,
        description,
        icons: {
          '16': 'img/16.png',
          '24': 'img/24.png',
          '32': 'img/32.png',
          '48': 'img/48.png',
          '128': 'img/128.png',
          '256': 'img/256.png',
          '512': 'img/512.png',
        },
        options_page: 'src/options.html',
        permissions: ['storage'],
        content_scripts: [
          {
            matches: [
              'https://www.nicovideo.jp/*',
              'https://live.nicovideo.jp/watch/*',
            ],
            js: ['src/contentScript.ts'],
          },
        ],
        web_accessible_resources: [
          {
            resources: [],
            matches: [
              'https://www.nicovideo.jp/*',
              'https://live.nicovideo.jp/*',
            ],
          },
        ],
      }),
    }),
  ],
  server: {
    cors: true,
  },
});
