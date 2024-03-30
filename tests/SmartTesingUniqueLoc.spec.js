import {test, expect } from '@playwright/test';

test('Unique Locator Testing', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    //checkboxes & radioboxes
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    const successMessage = await page.getByText("Success! The Form has been submitted successfully!.").textContent();
    console.log(successMessage)
    await page.getByRole("link", {name: "shop"}).click();
    await page.getByText("Shop Name").waitFor();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button",{name: "Add"}).click();
})