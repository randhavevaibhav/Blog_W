import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:4173`,
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            alias: {
              // Define your aliases here
              "@components": path.resolve(__dirname, "cypress/e2e/components"),
              "@utils": path.resolve(__dirname, "cypress/e2e/utils"),
              "@fixtures": path.resolve(__dirname, "cypress/fixtures"),
              "@cypress": path.resolve(__dirname, "cypress/"),
              // Add more aliases as needed
            },
            extensions: [".js", ".jsx", ".ts", ".tsx"], // Add extensions for your files
          },
        },
      };
      on("file:preprocessor", webpackPreprocessor(options));
    },
    env: {
      clientURL: "http://localhost:5173",
      apiURL: "http://localhost:8003",
      userEmail: "test11@gmail.com",
      password: "123456",
    },
  },
});
