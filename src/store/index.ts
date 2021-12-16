import { createStore } from "vuex";
import axios from "axios";

export type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
};

export type CartProduct = {
  id: number;
  title: string;
  price: string;
  quantity: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
};

export default createStore({
  modules: {
    categories: {
      namespaced: true,
      state() {
        return {
          categories: [] as string[],
        };
      },
      actions: {
        getCategories({ commit }) {
          axios
            .get("https://fakestoreapi.com/products/categories")
            .then(({ data }) => {
              commit("setCategories", data);
            });
        },
      },
      mutations: {
        setCategories(state, categories) {
          console.log(categories); ///LOG***
          state.categories = categories;
        },
      },
    },

    products: {
      namespaced: true,
      state() {
        return {
          products: [] as Product[],
        };
      },
      actions: {
        getProducts({ commit }) {
          axios.get("https://fakestoreapi.com/products").then(({ data }) => {
            commit("setProducts", data);
          });
        },
      },
      mutations: {
        setProducts(state, products) {
          console.log(products); ///LOG***
          state.products = products;
        },
      },
    },

    cart: {
      namespaced: true,
      state() {
        return {
          cart: [] as CartProduct[],
        };
      },
      actions:{
      },
      mutations: {

      },
    },
  },
});
