const {test, expect} = require('@playwright/test');
const { log } = require('console');
const exp = require('constants');
const { Http2ServerRequest } = require('http2');


test('My first Test', async({browser})=>
{
  
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const title = await page.title();
  const userName = page.locator('#username');
  const password = page.locator('#password');
  //expect(page).toHaveTitle("Google");
  await userName.fill('');
  await password.fill('');
  await userName.fill('rahulshettyacademy');
  await password.fill('learning');
  await page.locator('input.btn.btn-info.btn-md').click();
  //console.log(await page.locator("[style*='block']").textContent());
  //await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  await expect(page).toHaveTitle("ProtoCommerce");
  //console.log(await page.locator(".card-body a").nth(0).textContent());
  //console.log(await page.locator(".card-body a").nth(1).textContent());
  //console.log(await page.locator(".card-body a").nth(2).textContent());
  console.log(await page.locator(".card-body a").nth(3).textContent());
  console.log(await page.locator(".card-body a").allTextContents());
  });


test('My Second Test', async({page})=>
{
  await page.goto("https://rahulshettyacademy.com/client");
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const login = page.locator("#login");
  await userName.fill("pavankp1985@gmail.com");
  await password.fill("Qwerty@30");
  await login.click();
  await page.waitForLoadState('networkidle');
  //console.log(await page.locator(".card-body b").nth(0).textContent());
  //console.log(await page.locator(".card-body b").nth(1).textContent());
  //console.log(await page.locator(".card-body b").nth(2).textContent());
  console.log(await page.locator(".card-body b").allTextContents());


});

test('Dropdowns', async({page})=> {
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     const title = await page.title();
     const userName = page.locator('#username');
     const password = page.locator('#password');
     const docLink = page.locator("[href*='rahul']");
     await userName.fill('rahulshettyacademy');
     await password.fill('learning');
     await page.locator('select.form-control').selectOption('consult');
     await page.locator('.customradio').last().click();
     await page.locator('button#okayBtn').click();
     await page.locator('input#terms').click();
     await expect(page.locator('.customradio').last()).toBeChecked();
     await expect(page.locator('input#terms')).toBeChecked();
     await expect(docLink).toHaveAttribute("class","blinkingText")
     console.log(await page.locator('.customradio').last().isChecked());
     console.log(await page.locator('input#terms').isChecked());
     
     //await page.pause();
     await page.locator('input.btn.btn-info.btn-md').click();
})


test('Child Window', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const title = await page.title();
    const docLink = page.locator("[href*='rahul']");
    const [newPage] = await Promise.all(  //Returns fulfilled promises
        [
            context.waitForEvent('page'),
            docLink.click()
    ])
    console.log(await newPage.locator('.red').textContent());
    await expect(newPage.locator('.red')).toHaveText('Please email us at mentor@rahulshettyacademy.com with below template to receive response');
})

