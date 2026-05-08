// @ts-check
const {devices} = require('@playwright/test')
//const { reporter } = require('./playwright.config copy')

const config = {
  testDir: './tests',
  timeout: 30*1000,
  expect:{
    timeout:5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on'  //Retain On failure
  },
};
module.exports = config;

