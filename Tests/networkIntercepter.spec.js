const {test, expect, request} = require('@playwright/test');
const { log } = require('console');
const exp = require('constants');
const {APIUtils} = require('./helpers/APPUtils')
const { Http2ServerRequest } = require('http2');
const userDetails = {userEmail: "ppp30@gmail.com",userPassword: "Learning@30"};
const  mockOrders = {data: [], message: "No Orders"};
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

test.only('API Test', async ({page})=>
{
     page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",    //API URL to be intercepted before action (call been made)
    async route =>
    {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(mockOrders);
        route.fulfill(
            {
                response,
                body,
            })
        });
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log("Hello");
});

