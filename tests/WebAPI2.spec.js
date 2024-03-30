const {test, expect} = require('@playwright/test')
let webContext;
let emailValue;

//Writing the login only once where other test cases won't have to do the login process
test.beforeAll(async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client/")
    const email = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    emailValue = "qwqqe1@gmail.com";

    await email.fill(emailValue)
    await password.fill("Qwerty$1")
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle')
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'})
})
 
test('Login Lets shop', async()=>{

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/")
    const cards = await page.locator(".card-body b")
    console.log(await cards.allTextContents());
    await expect(page.locator("//p[normalize-space()='Automation Practice']")).toContainText("Automation Practice");
    console.log(await cards.nth(0).textContent());
    await expect(await cards.nth(0)).toContainText("ZARA COAT 3");

    //Add Items dynamically to cart
    const desiredProduct = "ADIDAS ORIGINAL";
    const products = await page.locator(".card-body");

    const count =  await products.count();

    for(let i = 0 ; i < count ; i++){
      if(await products.nth(i).locator("b").textContent() === desiredProduct)  {
        await products.nth(i).locator(".w-10").click();
        break;
      }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    await expect(page.locator("h3:has-text('ADIDAS ORIGINAL')")).toContainText(desiredProduct);

    await page.locator("text = Checkout").click();
    
    await page.locator("[placeholder*='Country']").pressSequentially('Nig');
    const dropdown = await page.locator(".ta-results")
    await dropdown.waitFor();
    const options = await dropdown.locator("button").count();

    for (let i = 0; i < options; i++){
       const textOption =  await dropdown.locator("button").nth(i).textContent();
       if(textOption === " Nigeria"){
        await dropdown.locator("button").nth(i).click();
        break;
       }
    }
    await expect(await page.locator("label[type='text']")).toHaveText(emailValue);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 label.ng-star-inserted").first().textContent();
    console.log(orderId);
    await page.locator("label[routerlink*='myorders']").click();
    await page.locator("h1[class='ng-star-inserted']").waitFor();

    const productRows = await page.locator("tr.ng-star-inserted")
    const orderIdcount = await productRows.locator("th").count();

    console.log(orderIdcount);

    for (let i = 0; i < orderIdcount; i++){
     const allOrderId = await productRows.locator("th").nth(i).textContent();
     console.log(allOrderId);
        if (orderId.includes(allOrderId)){
            console.log(allOrderId);
            console.log(orderId);
            await page.locator("td button.btn-primary").nth(i).click();
            await expect(await page.locator(".email-title")).toHaveText(" order summary ");
            await expect(await page.locator(".col-text.-main")).toHaveText(allOrderId);
            break;

     }
}
})

test('Login Test 2', async()=>{

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/")
    const cards = await page.locator(".card-body b")
    console.log(await cards.allTextContents());
    await expect(page.locator("//p[normalize-space()='Automation Practice']")).toContainText("Automation Practice");
    console.log(await cards.nth(0).textContent());
    await expect(await cards.nth(0)).toContainText("ZARA COAT 3");

})



test.skip("Visible/Invisible Elements & Popup Valaidation Test", async ({page})=>{

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

    const framedPage = await page.frameLocator("#courses-iframe");
    await framedPage.locator("li .new-navbar-highlighter").nth(0).click();
    const frameText = await framedPage.locator("div .text h2").textContent();
    console.log(frameText);
    const splitText = await frameText.split(" ")[1];
    console.log(splitText);



})