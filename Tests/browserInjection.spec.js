const {test, expect} = require('@playwright/test');
const { log } = require('console');
const exp = require('constants');
const { Http2ServerRequest } = require('http2');
const { before } = require('node:test');
let webContext;

test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("#login");
    await userName.fill("pppp30@gmail.com");
    await password.fill("Learning@30");
    await login.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
})

test('InjectionTest', async() => {
    await webContext.newPage;
})