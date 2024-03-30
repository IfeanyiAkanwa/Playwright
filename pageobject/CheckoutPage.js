
const {test, expect} = require('@playwright/test')
class CheckoutPage{

    constructor(page){
        this.page = page
        this.checkoutbtn = page.locator("text = Checkout");
        this.countryField = page.locator("[placeholder*='Country']");
        this.dropdownList = page.locator(".ta-results");
        this.options = this.dropdownList.locator("button");
        this.checkoutEmailAssertion = page.locator("label[type='text']");
        this.submitbtn = page.locator(".action__submit");
        

    }
    async checkoutDetails(country, emailValue){
        await this.checkoutbtn.click();
    
        await this.countryField.pressSequentially('Nig');
        const dropdown = await this.dropdownList
        await dropdown.waitFor();
        const options = await this.options.count();
    
        for (let i = 0; i < options; i++){
           const textOption =  await this.options.nth(i).textContent();
           if(textOption === country){
            await this.options.nth(i).click();
            break;
           }
        }
        await expect(await this.checkoutEmailAssertion).toHaveText(emailValue);
        await this.submitbtn.click();

    }
}
module.exports = {CheckoutPage};