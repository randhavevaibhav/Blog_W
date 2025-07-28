import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      rootURL: "http://localhost:5173",
      userEmail: "test11@gmail.com",
      password: "VaibhavR@1722",
    },
  },
});
