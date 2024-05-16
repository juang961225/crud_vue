import { createRouter, createWebHistory } from "vue-router";
import productList from "../components/productList";
import orderList from "../components/ordersList";
import createOrder from "../components/createOrder";
import login from "../components/login";
import register from "../components/register";

let loggedIn = false;

export function setLoggedIn(value) {
    loggedIn = value;
}

const routes = [
    { path: "/products", component: productList },
    { path: "/orders", component: orderList },
    { path: "/create-order", component: createOrder },
    { path: "/login", component: login },
    { path: "/register", component: register },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
