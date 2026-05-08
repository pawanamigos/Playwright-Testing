const {test, expect, request} = require('@playwright/test');
const { log } = require('console');
const exp = require('constants');
const {APIUtils} = require('./helpers/APPUtils')
const { Http2ServerRequest } = require('http2');
const userDetails = {userEmail: "ppp30@gmail.com",userPassword: "Learning@30"}
const productId = {
    orders: [
        {
            country: "Benin",
            productOrderedId: "6581ca399fd99c85e8ee7f45"
        }
    ]
}
let response;

test.beforeAll(async () => {
const apiContext = await request.newContext();
const apiUtils = new APIUtils(apiContext, userDetails);
response = await apiUtils.createOrder(productId);
})

test('API Test', async ({page})=>
{
     page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    console.log(await page.locator(".card-body b").allTextContents());
    console.log(response.orderID);
})

