class APIUtils{

    constructor(apiContext, loginPayLoadData){
        this.apiContext = apiContext
        this.loginPayLoad = loginPayLoadData
    }

    async getToken(){
        const loginResponse =  await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data:this.loginPayLoad})
        //await expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json()
        const token = await loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
        {
            data: orderPayload, 
            headers:{ 'Authorization': response.token,'Content-Type': 'application/json'}
        })
        const orderResponsejson = await orderResponse.json();
        console.log(orderResponsejson);
        const orderId = orderResponsejson.orders[0];
        response.orderId = orderId;
        return response
    }
}
module.exports = {APIUtils};