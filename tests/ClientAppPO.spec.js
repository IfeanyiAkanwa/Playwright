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
    


// test('Lets shop registration portal', async({page})=>{
//     const firstName = page.locator("#firstName")
//     const lastName = page.locator("#lastName")
//     const email = page.locator("#userEmail")
//     const PhoneNo = page.locator("#userMobile")
//     const password = page.locator("#userPassword")
//     const confirmPassword = page.locator("#confirmPassword")
//     await page.goto("https://rahulshettyacademy.com/client/")
//     await page.locator(".btn1").click();
//     await firstName.fill("Davido")
//     await lastName.fill("Ifeanyio")
//     await email.fill("davidakanwa006@gmail.com")
//     await PhoneNo.fill("7788776646")

//     await page.locator("select.custom-select").selectOption("2: Student");
//     //OR const dropdown = await page.locator("select.custom-select");
//     // await dropdown.selectOption("2: Student");
    
//     await page.locator("label input.ng-pristine").nth(0).click();
//     await page.waitForTimeout(1000);
//     await password.fill("Wizkid001$")
//     await confirmPassword.fill("Wizkid001$")
//     await page.locator("input[type='checkbox']").click();
//     await page.locator("#login").click();
//     await page.waitForTimeout(1000)
//     await expect(page.locator("//h1[normalize-space()='Account Created Successfully'")).toContainText("Account Created Successfully");
//     await page.locator(".btn.btn-primary").click(); 

// });