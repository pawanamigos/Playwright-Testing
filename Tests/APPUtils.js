const { use } = require("../../playwright.config");
let response;
let sessionToken;

class APIUtils{
    constructor(apiContext,userDetails){
        this.apiContext = apiContext;
        this.userDetails = userDetails;
    }
    async getToken(){
            const response = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",  {
            data: this.userDetails,
    }
    );
const json = await response.json();
sessionToken= json.token;
console.log("Printing API Token")
console.log(sessionToken);
return sessionToken;
    }

async createOrder(productId ){
    response = {}
    response.token = await this.getToken();
    const createOdrer = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
    data: productId,
    headers: {
        'Authorization': response.token,
        'content-Type': 'application/json'
}
})
const orderResponse = await createOdrer.json();
const orderID = orderResponse.orders;
response.orderID = orderID;
//console.log(orderID)
return response;
}
}
module.exports = {APIUtils}