import {test, expect, request} from '@playwright/test'
import {APIUtils} from '../utils/APIUtils'

const loginPayLoadData = {
    userEmail: "qwqqe1@gmail.com", 
    userPassword: "Qwerty$1"
    }
const orderPayload = {
    orders:[{country: "Nigeria", productOrderedId: "6581ca979fd99c85e8ee7faf"}]
    
}

const fakeResponsePayLoad = {data:[], message:"No Orders"}

let response;
let token; 

test.beforeAll( async ()=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayLoadData);
   // response = await apiUtils.createOrder(orderPayload)
    token = await apiUtils.getToken();
   
});

   
test("Security Test network response intercept", async({page})=>{
    page.addInitScript(value =>{
        window.localStorage.setItem("token", value)
    }, token)
    await page.goto("https://rahulshettyacademy.com/client/")
    
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route=>{
        //intercepting response - API response ->|fake response|browser->render data to frontend
     const response =  await page.request.fetch(route.request());
     let body = JSON.stringify(fakeResponsePayLoad); //CONVERT PAYLOAD FRO JAVASCRIPT OBJECT TO JSON to pass it to the network response
    //response modification is done by fulfill method
     route.fulfill({response,body,});

    })

    await page.locator("li [routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await expect(page.getByText(' You have No Orders to show at this time.')).toBeVisible();
    const NoOrders =  await page.getByText(' You have No Orders to show at this time.').textContent();
    console.log(NoOrders);
    const productRows = await page.locator("tr.ng-star-inserted")
    const orderIdcount = await productRows.locator("th").count();
    
    console.log(orderIdcount);
    
})
   
    

