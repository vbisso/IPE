import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        bookPage: path.resolve(__dirname, "src/book-page/index.html"),
        bookConfirm: path.resolve(
          __dirname,
          "src/book-confirmation/index.html"
        ),
        productPages: path.resolve(__dirname, "src/product-pages/index.html"),
        productList: path.resolve(__dirname, "src/product-list/index.html"),
      },
    },
  },
});
