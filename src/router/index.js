import { createRouter, createWebHistory } from "vue-router";
import productList from '../components/productList'
import orderList from '../components/ordersList.vue'
import createOrder from '../components/createOrder.vue'

const routes = [
    { path: "/products", component: productList },
    { path: "/orders", component: orderList },
    { path: "/create-order", component: createOrder },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
