import {test, expect, request} from '@playwright/test'
import {APIUtils} from '../utils/APIUtils'

const loginPayLoadData = {
    userEmail: "qwqqe1@gmail.com", 
    userPassword: "Qwerty$1"
}
let token;
test.beforeAll(async()=>{
    const apiContext = await request.newContext();
    const apiutils = new APIUtils(apiContext, loginPayLoadData)
    token = await apiutils.getToken();
})

test("Security Test request Intercept", async({page})=>{
    page.addInitScript(value=>{
        window.localStorage.setItem("token", value)
    }, token)
    console.log("This is token"  +token);
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("li [routerlink*='myorders']").click();
    //login and reach orders code
    //continue is used to intecept request calls
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route=>route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=65ef57dfra86f8f74dc993d2f'}))
    
    await page.getByRole('button', {name: 'View'}).nth(0).click();
    console.log(await page.locator("div .blink_me").textContent()); 
    await expect(page.locator("div .blink_me")).toHaveText("You are not authorize to view this order")
})