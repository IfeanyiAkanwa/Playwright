class LoginPage{

    constructor(page)
    {
        this.page = page;
        this.signInbutton = page.locator("#login");
        this.emailValue = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async navigateToLogin(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(emailValue, password){
        await this.emailValue.fill(emailValue)
        await this.password.fill(password)
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle')
    }
}
module.exports = {LoginPage};