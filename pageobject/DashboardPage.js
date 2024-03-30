const {test, expect} = require('@playwright/test')
class DashboardPage {

    constructor(page) {
        this.page = page
        this.products = page.locator(".card-body")
        this.cardTitles = page.locator(".card-body b")
        this.dashboardHeader = page.locator("//p[normalize-space()='Automation Practice']")
        this.cartLink = page.locator("[routerlink*='cart']")
        this.itemList = page.locator("h3:has-text('ADIDAS ORIGINAL')")

    }

    async searchProductAddCart(desiredProduct) {

        console.log(await this.cardTitles.allTextContents());
        await expect(this.dashboardHeader).toContainText("Automation Practice");
        console.log(await this.cardTitles.nth(0).textContent());
        await expect(await this.cardTitles.nth(0)).toContainText("ZARA COAT 3");

        //Add Items dynamically to cart
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === desiredProduct) {
                await this.products.nth(i).locator(".w-10").click();
                break;
            }
        }

    }

    async navigateToCart() {
        await this.cartLink.click();

        await this.page.locator("div li").first().waitFor();
       // await expect(this.itemList).toContainText(desiredProduct);
    }
}

module.exports = {DashboardPage};