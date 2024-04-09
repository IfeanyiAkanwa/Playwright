import {test, expect} from '@playwright/test'
import dataset from '../utils/placeholderTestData.json'
// import {POManager} from '../pageobject/POManager'
import {LoginPage} from '../pageobject/LoginPage'
import {DashboardPage} from '../pageobject/DashboardPage'
import {CheckoutPage} from '../pageobject/CheckoutPage'
import {MyordersPage} from '../pageobject/MyordersPage'

const datasets = JSON.parse(JSON.stringify(dataset))

for (const data of datasets){
  test(`@Web Login Lets shop for ${data.desiredProduct}`, async({page})=>{
    // const PoManager = new POManager(page)
    const loginPage = new LoginPage(page)
    const dashboardpage = new DashboardPage(page)
    const checkoutpage = new CheckoutPage(page)
    const orderspage = new MyordersPage(page)

    // PoManager.getLoginPage();
    await loginPage.navigateToLogin();
    await loginPage.validLogin(data.emailValue,data.password)
    await dashboardpage.searchProductAddCart(data.desiredProduct);
    await dashboardpage.navigateToCart();
    await checkoutpage.checkoutDetails(data.country, data.emailValue)
    await orderspage.ordersConfirmation();
    
  })
}

test("Visible/Invisible Elements & Popup Validation Test", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.goto("https://google.com")
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    //await page.getByRole("input", {name: "Hide"}).click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#confirmbtn").click();
    await page.on("dialog", dialog => dialog.accept());
    await page.locator("#mousehover").hover();

//Dealing with iFrames 
    const framedPage = await page.frameLocator("#courses-iframe");
    await framedPage.locator("li .new-navbar-highlighter").nth(0).click();
    const frameText = await framedPage.locator("div .text h2").textContent();
    console.log(frameText);
    const splitText = await frameText.split(" ")[1];
    console.log(splitText);

})
    

test('Screenshot testing', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'boxElementScreenshot.png'})
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.screenshot({path: 'screenshot.png'});


});
//Visual testing - 
//This can be used for test where codes cant test like element alignment, colors etc
test('Visual testing', async({page})=>{
  await page.goto("https://google.com")
  await expect(await page.screenshot()).toMatchSnapshot('googlelanding.png')
 


});