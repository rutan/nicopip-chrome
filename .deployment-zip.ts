import { resolve } from 'node:path';
import { defineConfig } from '@rutan/deployment-zip';
import { name, version } from './app/manifest.json';

export default defineConfig({
  ignores: ['.DS_Store', 'thumb.db'],
  zip: {
    output: resolve(__dirname, '_dist', `${name}_${version}.zip`),
  },
});
