import {test, expect, request} from '@playwright/test'
import {APIUtils} from '../utils/APIUtils'

const loginPayLoadData = {
    userEmail: "qwqqe1@gmail.com", 
    userPassword: "Qwerty$1"
    }
const orderPayload = {orders:
    [{country: "Nigeria",
      productOrderedId: "6581ca979fd99c85e8ee7faf"
    }]
    
}

let response;
let token; 

test.beforeAll(async ()=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayLoadData);
    response = await apiUtils.createOrder(orderPayload)
    token = await apiUtils.getToken();
   
});

// test.beforeEach(()=>{

// });

test('Login Lets shop', async({page})=>{

    page.addInitScript(value =>{
        window.localStorage.setItem("token", value)
    }, token)

    await page.goto("https://rahulshettyacademy.com/client/")
    const cards = await page.locator(".card-body b")
    console.log(await cards.allTextContents());
    await expect(page.locator("//p[normalize-space()='Automation Practice']")).toContainText("Automation Practice");
    console.log(await cards.nth(0).textContent());
    await expect(await cards.nth(0)).toContainText("ZARA COAT 3");
})
   
test("Create Order", async({page})=>{
    page.addInitScript(value =>{
        window.localStorage.setItem("token", value)
    }, token)
    await page.goto("https://rahulshettyacademy.com/client/")
    //console.log(response.orderId);
    await page.locator("li [routerlink*='myorders']").click();
    await page.locator("h1[class='ng-star-inserted']").waitFor();
    
    const productRows = await page.locator("tr.ng-star-inserted")
    const orderIdcount = await productRows.locator("th").count();
    
    console.log(orderIdcount);
    
    for (let i = 0; i < orderIdcount; i++){
    const allOrderId = await productRows.locator("th").nth(i).textContent();
    console.log(allOrderId);
        if (response.orderId.includes(allOrderId)){
            console.log(allOrderId);
            console.log(response.orderId);
            await page.locator("td button.btn-primary").nth(i).click();
            await expect(await page.locator(".email-title")).toHaveText(" order summary ");
            await expect(await page.locator(".col-text.-main")).toHaveText(allOrderId);
            break;
            }
    }
})
   
    

