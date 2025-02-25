import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { reactClickToComponent } from "vite-plugin-react-click-to-component";

const viteConfig = defineConfig((env) => {
  const isDevMode = env.mode.includes("dev");
  return {
    base: isDevMode ? "/" : "/1Piece/",
    plugins: [
      react({
        jsxRuntime: "automatic",
      }),
      reactClickToComponent(),
    ],
    server: {
      host: "localhost",
      port: 3000,
      cors: true,
    },
    preview: {
      host: "localhost",
      port: 8080,
      cors: true,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});

export default viteConfig;
