<template>
  <div>
    <h1 v-for="product in cartProducts" :key="product.id">{{product.title}}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import { CartProduct} from "@/store";

export default defineComponent({
  name: "Cart",
  data: () => ({
    cartProducts: [] as CartProduct[],
  }),
  computed: {
    ...mapState("cart", ["cart"]),
  },
  created() {
    this.cartProducts = this.cart;
    console.log(this.cartProducts);
  },
});
</script>

<style scoped></style>
