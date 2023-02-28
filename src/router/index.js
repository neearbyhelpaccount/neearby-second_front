import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import MainPage from "../views/MainPage.vue";
import Documentation from  "../views/Documentation";
const ApiWrapper = require('../api');
import store from '../store';
import BalanceView from "@/views/BalanceView";
import WithdrawMoney from "@/views/WithdrawMoney";
import OrdersView from "@/views/OrdersView.vue";
import RegistrationView from "@/views/RegistrationView.vue"
import RegistrationConfirmView from "@/views/RegistrationConfirmView.vue";
import LoginView from "@/views/LoginView.vue";
import PasswordRecoveryView from "@/views/PasswordRecoveryView.vue";
import ThanksForRegistration from "@/views/ThanksForRegistration.vue";
import ChooseSubdomain from "@/views/ChooseSubdomain.vue";
import CreateProductView from '@/views/CreateProductView.vue'
import MessagesView from "@/views/MessagesView.vue";
import YourOrdersView from '@/views/YourOrdersView.vue'
import ChooseSubdomainSuccess from "@/views/ChooseSubdomainSuccess.vue";
import ProductView from "@/views/ProductView";
import AdminPanel from "@/views/AdminPanel";
import EditProductView from "@/views/EditProductView";

const routes = [
    {
        path: "/",
        name: "landing",
        component: MainPage,
    },
    {
        path: "/info",
        name: "info",
        component: Documentation,
    },
    {
        path: "/admin-panel",
        name: "admin-panel",
        component: AdminPanel,
    },
    {
        path: "/edit-product/:id",
        name: "edit-product",
        component: EditProductView,
    },
    {
        path: "/page/:login",
        name: "home",
        component: HomeView,
    },
    {
        path: "/product/:id",
        name: "product-path",
        component: ProductView,
    },
    {
        path: "/balance",
        name: "balance",
        component: BalanceView
    },
    {
        path: "/withdraw",
        name: "withdraw",
        component: WithdrawMoney
    },
    {
        path: '/orders',
        name: 'orders',
        component: OrdersView
    },
    {
        path: '/registration',
        name: 'registration',
        component: RegistrationView
    },
    {
        path: '/confirm-your-registration',
        name: 'confirm-your-registration',
        component: RegistrationConfirmView
    },
    {
        path: '/enter-your-personal-account',
        name: 'enter-your-personal-account',
        component: LoginView
    },
    {
        path: '/recover-your-password',
        name: 'recover-your-password',
        component: PasswordRecoveryView
    },
    {
        path: '/add-product',
        name: 'add-product',
        component: CreateProductView
    },
    {
        path: '/your-orders',
        name: 'your-orders',
        component: YourOrdersView
    },
    {
        path: '/thank-you-for-registering/:token',
        name: 'thank-you-for-registering',
        component: ThanksForRegistration
    },
    // {
    //     path: '/thank-you-for-registering/:token',
    //     name: 'thank-you-for-registering',
    //     component: ThanksForRegistration
    // },
    {
        path: '/choose-your-subdomain',
        name: 'choose-your-subdomain',
        component: ChooseSubdomain
    },
    {
        path: '/messenger',
        name: 'messages',
        component: MessagesView
    },
    {
        path: '/subdomain-set-successfully',
        name: 'subdomainSuccess',
        component: ChooseSubdomainSuccess
    },


];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {

    try {
        let user = await ApiWrapper.whoami();
        store.commit('setAuthorized', false);
        if (user?.success) {
            store.commit('setAuthorized', true);
        }
        next()
    } catch (e) {
        next()
    }
})


router.beforeEach( async (to, from, next) => {


    if(location.pathname == '/choose-your-subdomain'){
        next();
        return;
    }

    let user = (await ApiWrapper.whoami()).data;


 
  if (user.role == 1) {
    location.href = '/choose-your-subdomain';
  }
  else {
    next()
  }
})

export default router;
