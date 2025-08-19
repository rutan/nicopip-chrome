import { resolve } from 'node:path';
import { defineConfig } from '@rutan/deployment-zip';
import { name, version } from './dist/manifest.json';

export default defineConfig({
  ignores: ['.DS_Store', 'thumb.db'],
  zip: {
    output() {
      return resolve('_dist', `${name}-${version}.zip`);
    },
  },
});
