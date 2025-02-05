const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 20000,
    retries: {
      runMode: 2,  // Retries in headless mode
      openMode: 1   // Retries in interactive mode
    },
    chromeWebSecurity: false,
    screenshotOnRunFailure: true,
    video: false,

    setupNodeEvents(on, config) {
      // Implement event listeners here
      on("before:browser:launch", (browser = {}, launchOptions) => {
        console.log("Launching browser:", browser.name);
        return launchOptions;
      });

      on("task", {
        log(message) {
          console.log(message);
          return null;
        }
      });

      return config; // Always return config
    }
  }
});
