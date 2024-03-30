const {test, expect} = require('@playwright/test')
class MyordersPage{

    constructor(page){
        this.page = page
        this.orderId = page.locator(".em-spacer-1 label.ng-star-inserted");
        this.allOrders = page.locator(".col-text.-main");
        this.ordersbtn = page.locator("label[routerlink*='myorders']");
        this.ordersList = page.locator("h1[class='ng-star-inserted']");
        this.productRows = page.locator("tr.ng-star-inserted");
        this.viewOrdersbtn = page.locator("td button.btn-primary");
        this.orderMsg = page.locator(".hero-primary");
        this.orderSummaryConfirmation = page.locator(".email-title");
    }

    async ordersConfirmation(){
       await expect(this.orderMsg).toHaveText(" Thankyou for the order. ");
        const orderId = await this.orderId.first().textContent();
        console.log(orderId);
        await this.ordersbtn.click();
        await this.ordersList.waitFor();
    
        const productRows = await this.productRows
        const orderIdcount = await productRows.locator("th").count();
    
        console.log(orderIdcount);
    
        for (let i = 0; i < orderIdcount; i++){
         const allOrderId = await productRows.locator("th").nth(i).textContent();
         console.log("orderId:", orderId);
         console.log("allOrderId:", allOrderId);
            if (orderId.includes(allOrderId)){
                console.log(allOrderId);
                console.log(orderId);
                await this.viewOrdersbtn.nth(i).click();
                // await expect(await this.orderSummaryConfirmation).toHaveText(" order summary ");
                // await expect(await this.allOrders).toHaveText(allOrderId);
                break;
    
         }
        }
    }
}

module.exports = {MyordersPage};