import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Category from "@/components/Category.vue";
import ProductPage from "@/components/ProductPage.vue";
import Cart from "@/components/Cart.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/category/:id",
    name: "Category :id",
    component: Category,
  },
  {
    path: "/:category/:id",
    name: "Product :id",
    component: ProductPage,
  },
  {
    path: "/cart",
    name:"Cart",
    component: Cart
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
