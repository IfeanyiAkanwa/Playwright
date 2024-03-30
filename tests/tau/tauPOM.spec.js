import {test, expect} from '@playwright/test'

test("Check Title on Page",  async({page})=>{
    await page.goto('https://playwright.dev')
    await expect(page).toHaveTitle(/Playwright/);

});

test('get started link', async({browser})=>{
  const context =  await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://playwright.dev");
  await page.getByRole('link', {name:'Get started'}).click();
});

test("Check Java Page", async ({page})=>{
    await page.goto("https://playwright.dev");
    await page.getByRole('link', {name:'Get started'}).click();
    await page.getByRole('button', {name:'Node.js'}).hover();
    await page.getByText('Java', {exact: true}).click();
    await expect(page).toHaveURL('https://playwright.dev/java/docs/intro')
    await expect(page.getByText('Installing Playwright', {exact : true})).not.toBeVisible();
    const javaDescription = 'Playwright is distributed as a set of Maven modules.'
    await expect(page.getByText(javaDescription)).toBeVisible();
})