import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({


  e2e: {
        setupNodeEvents(on, config) {
          const options = {
            webpackOptions: {
              resolve: {
                alias: {
                  // Define your aliases here
                  "@components": path.resolve(__dirname, "cypress/e2e/components"),
                  "@utils": path.resolve(__dirname, "cypress/e2e/utils"),
                  "@fixtures": path.resolve(__dirname, "cypress/fixtures"),
                  "@cypress":path.resolve(__dirname, "cypress/"),
                  // Add more aliases as needed
                },
                extensions: [".js", ".jsx", ".ts", ".tsx"], // Add extensions for your files
              },
            },
          };
          on("file:preprocessor", webpackPreprocessor(options));
        },
         env: {
      rootURL: "http://localhost:5173",
      userEmail: "test11@gmail.com",
      password: "VaibhavR@1722",
    },
      },
});
