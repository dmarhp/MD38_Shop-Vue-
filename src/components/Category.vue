<template>
  <div v-if="loading === false" class="category__wrapper">
    <div class="category__filter">
      <input
        class="category__filter_search"
        v-model="inputValue"
        placeholder="Search products..."
        @input="onInputChange"
        type="text"
      />

      <button
        :class="[
          `category__filterBtn`,
          activeBtn === `priceUP` ? `active` : '',
        ]"
        @click="sortByPrice"
      >
        Price <i class="fas fa-arrow-up" />
      </button>
      <button
        :class="[
          `category__filterBtn`,
          activeBtn === `priceDN` ? `active` : '',
        ]"
        @click="sortByPriceRev"
      >
        Price <i class="fas fa-arrow-down" />
      </button>
      <button
        :class="[`category__filterBtn`, activeBtn === `POP` ? `active` : '']"
        @click="sortByRating"
      >
        Rating <i class="fas fa-star" />
      </button>
    </div>

    <div>
      <div class="category__products" v-if="loading === false">
        <ProductCard
          v-for="product in productsToShow"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Product } from "@/store";
import { mapState } from "vuex";
import ProductCard from "@/components/ProductCard.vue";

export default defineComponent({
  name: "Category",
  components: { ProductCard },
  data: () => ({
    loading: true,
    categoryProducts: [] as Product[],
    productsToShow: [] as Product[],
    inputValue: "",
    activeBtn: "",
  }),
  methods: {
    onInputChange() {
      this.productsToShow = this.categoryProducts.filter((product) =>
        product.title.toUpperCase().match(this.inputValue.toUpperCase())
      );
    },

    sortByPrice() {
      this.productsToShow = this.productsToShow.sort((a: Product, b: Product) =>
        a.price > b.price ? 1 : b.price > a.price ? -1 : 0
      );
      this.activeBtn = "priceUP";
    },

    sortByPriceRev() {
      this.sortByPrice();
      this.productsToShow = this.productsToShow.reverse();
      this.activeBtn = "priceDN";
    },

    sortByRating() {
      this.productsToShow = this.productsToShow.sort((a: Product, b: Product) =>
        a.rating.rate > b.rating.rate
          ? 1
          : b.rating.rate > a.rating.rate
          ? -1
          : 0
      );
      this.activeBtn = "POP";
    },
  },
  computed: {
    ...mapState("products", ["products"]),
  },
  created() {
    const routerId = this.$route.params.id;
    if (routerId === "all") {
      this.loading = false;
      this.categoryProducts = this.products;
      this.productsToShow = this.products;
    } else {
      this.loading = false;
      this.categoryProducts = this.products.filter(
        (product: Product) => product.category.toLowerCase() === routerId
      );
      this.productsToShow = this.categoryProducts;

      /*
      axios
        .get(`https://fakestoreapi.com/products/category/${routerId}`)
        .then(({ data }) => {
          this.loading = false;
          this.categoryProducts = data;
          this.productsToShow = data;
        });
       */
    }
  },
});
</script>

<style scoped lang="scss">
@import "../styles/helper";
.category__wrapper {
  background-color: #eee;
  padding: 20px 10%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.category__products {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 40px;
  row-gap: 40px;
}

.category__filter {
  padding: 20px;
  display: flex;
}

.category__filter_search {
  border-radius: 2px;
  width: 40%;
  padding: 15px;
  font-size: 20px;
  margin-right: 10px;
  border: none;
  transition: $trans_all;

  &:hover,
  &:focus {
    box-shadow: $box_sh1;
  }

  &:focus {
    outline: none;
    background-color: $col_main1;
  }
}

.category__filterBtn {
  border-radius: 2px;
  font-size: 20px;
  margin-right: 10px;
  padding: 15px;
  background-color: white;
  outline: 1px solid transparent;
  transition: $trans_all;
  border: none;

  &:hover {
    box-shadow: $box_sh1;
  }

  &:active {
    box-shadow: $box_sh2;
    background-color: $col_main6;
    color: $col_main1;
  }

  &.active {
    background-color: $col_main6;
    color: white;
  }
}
</style>
