const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.js',  
    baseUrl: 'http://127.0.0.1:8000/',       
  },
}); 
