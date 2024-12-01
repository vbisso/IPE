import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "src/",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        bookPage: path.resolve(__dirname, "src/book-page/index.html"),
        mapPage: path.resolve(__dirname, "src/map-page/index.html"),
        productPages: path.resolve(__dirname, "src/product-pages/index.html"),
        productList: path.resolve(__dirname, "src/product-list/index.html"),
      },
    },
  },
});
