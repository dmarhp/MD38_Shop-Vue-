<template>
  <header class="app__header">
    <div>
      <img
        src="https://js-beginners.github.io/filter-project/img/logo.svg"
        alt=""
      />
    </div>
    <nav v-if="categories.length > 0" class="app__nav">
      <router-link class="app__nav_link" :to="`/category/all`" :key="`all`"
        >All</router-link
      >
      <router-link
        class="app__nav_link"
        v-for="category in categories"
        :to="`/category/${category}`"
        :key="category"
        >{{ category.toUpperCase() }}</router-link
      >
    </nav>
    <router-link class="app__nav_link" :to="`/cart`" :key="`cart`">
      <i class="fas fa-shopping-cart app__cart" />
    </router-link>
  </header>

  <router-view :key="$route.path" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "App",
  computed: {
    ...mapState("categories", ["categories"]),
    ...mapState("products", ["products"]),
    ...mapState("cart", ["cart"]),
  },
  methods: {},
  mounted() {
    this.$store.dispatch("products/getProducts");
    this.$store.dispatch("categories/getCategories");
  },
});
</script>

<style lang="scss">
@import "./styles/helper";

.app {
  background-color: #eee;
  margin: 0 auto;
  width: 100%;
}
.app__header {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 18px 80px;
  justify-content: space-between;
  box-shadow: $box_sh1;
  margin-bottom: 50px;
}

.app__nav {
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding: 20px;
}

.app__nav_link {
  font-family: "Roboto", sans-serif;
  font-size: 32px;
  padding: 12px 24px;
  text-decoration: none;
  color: $col_blk5;
  border-radius: 2px;
  outline: 1px solid transparent;
  transition: $trans_all;

  &:hover {
    outline-color: #eee;
    box-shadow: $box_sh1;
  }

  &:active {
    box-shadow: $box_sh2;
    background-color: $col_main9;
    color: $col_main1;
  }
  &.router-link-exact-active {
    color: $col_main9;
    outline-color: $col_main9;
  }
}

.app__cart {
  color: black;
  font-size: 24px;
}
</style>
