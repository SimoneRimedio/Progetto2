// vite.config.js
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    styleImport({
      libs: [
        {
          libraryName: 'bootstrap',
          esModule: true,
          resolveStyle: (name) => {
            return `bootstrap/dist/css/${name}.css`;
          },
        },
      ],
    }),
  ],
});
