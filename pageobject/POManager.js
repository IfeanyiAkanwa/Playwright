import {LoginPage} from '../pageobject/LoginPage'
import {DashboardPage} from '../pageobject/DashboardPage'
import {CheckoutPage} from '../pageobject/CheckoutPage'
import {MyordersPage} from '../pageobject/MyordersPage'

class POManager {
    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardpage = new DashboardPage(this.page)
        this.checkoutpage = new CheckoutPage(this.page)
        this.orderspage = new MyordersPage(this.page)
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardpage;
    }
    getCheckoutPage() {
        return this.checkoutpage;
    }
    getOrdersPage() {
        return this.orderspage;
    }
}

module.exports = {POManager};