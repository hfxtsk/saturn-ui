import {defineConfig} from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";
import purgeIcons from 'vite-plugin-purge-icons';
import mars3dPlugin from "vite-plugin-mars3d";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    /* antd 按需加载 */
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    // mars3d
    mars3dPlugin(),
    // gzip压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    // 图标库@iconify/iconify
    purgeIcons({
      content: [
        '**/*.vue', // scan for .vue file as well
      ],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      '~': path.resolve(__dirname, 'packages'),
      '#': path.resolve(__dirname, 'lib'),
    },
  },
});
