import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import path from "path";
import fs from "fs";
import postcss from "postcss";
import atImport from "postcss-import";

// gabung CSS sebelum build
const buildCSS = async () => {
  const css = fs.readFileSync("src/css/index.css", "utf-8");
  const result = await postcss([atImport()]).process(css, {
    from: "src/css/index.css",
  });
  fs.mkdirSync("dist/css", { recursive: true });
  fs.writeFileSync("dist/css/index.css", result.css);
};

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: "dist",
    }),
    {
      name: "build-css",
      writeBundle: async () => {
        const css = fs.readFileSync("src/css/index.css", "utf-8");
        const result = await postcss([atImport()]).process(css, {
          from: "src/css/index.css",
        });
        fs.mkdirSync("dist/css", { recursive: true });
        fs.writeFileSync("dist/css/index.css", result.css);
      },
    },
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "EnigmaUI",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "clsx",
        "dayjs",
        "react-icons",
        "tailwindcss",
        "daisyui",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
