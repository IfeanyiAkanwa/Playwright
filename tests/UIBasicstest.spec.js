const {test, expect} = require('@playwright/test')


test('First Playwright test', async function({page}){
//Playwright code 
   await page.goto("https://google.com");
  //To get title and asset title is correct
   console.log(await page.title())
   await expect(page).toHaveTitle("Google")
});

test('Second Playwright test', async ({browser, page})=>{

    //chrome - plugins/cookies
    // const context = await browser.newContext();
    // const page = await context.newPage();
    const userName = page.locator('input#username')
    const password = page.locator('input#password')
    const cardTitles = page.locator('.card-body a')
    const documentLink = page.locator("[href*=documents-request]");
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())

    await userName.type('rahulshetty');
    // added just to make execution slower
    await page.waitForTimeout(2000);

    await password.fill('learning');
    // added just to make execution slower
    await page.waitForTimeout(2000);
    //dropdowns
    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("teach")

    //radiobuttons
    await page.locator(".checkmark").nth(1).click();
    await expect(page.locator(".checkmark").nth(1)).toBeChecked();

    await expect(page.locator(".modal-body p")).toContainText("You will be limited to only fewer functionalities of the app. Proceed?");
    await page.locator("#okayBtn").click();

    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked();
    //does not need await at the beginning of expect, because expect assertion toBBetruthy is not an action
    expect(await page.locator("#terms").isChecked()).toBeTruthy();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");

   // await page.pause();

    await page.locator('#signInBtn').click();
    //unlike selenium where you have to write waitUntil element is displayed, playwright is intelligent enough to wait for the element by default until the global timeout is elapsed
    console.log(await page.locator('[style = "display: block;"]').textContent()); 
    await expect(page.locator('[style = "display: block;"]')).toContainText("Incorrect")

    //Correct Username and Password Login 
    await userName.fill(""); //To clear what is in already existing field
    await userName.fill("rahulshettyacademy");
    await page.locator('#signInBtn').click();
    console.log(await cardTitles.nth(1).textContent());
    await expect (await cardTitles.nth(1)).toContainText('Samsung')
    await expect(await cardTitles.first()).toContainText('iphone X');
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test("@Web Test to handle child windows and tabs, switching browsers", async ({browser, page}) =>{

    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*=documents-request]");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
        
        
    ])
    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const splitText = await text.split('@');
    const newText = await splitText[1];
    const domain = await newText.split(" ");
    const domainEmail = await domain[0];
    console.log(domainEmail);
    await page.waitForTimeout(2000);
    await page.locator('input#username').type(domainEmail);
    await page.waitForTimeout(2000);
    

     
})


    
