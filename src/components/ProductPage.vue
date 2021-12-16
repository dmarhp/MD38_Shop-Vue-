<template>
  <div v-if="loading === false" class="productPage">
    <div class="productPage__title_wrapper">
      <h3 class="productPage__title">{{ product.title }}</h3>
    </div>

    <div class="productPage__details_wrapper">
      <div class="productImg_wrapper">
        <img class="productImg" :src="product.image" :alt="product.title" />
      </div>

      <div class="productInfo">
        <h3 class="productPage__desc">{{ product.description }}</h3>
        <div class="rating">
          <div class="stars">
            <i
              class="fas fa-star stars-gold"
              v-for="i in stars"
              :key="`${i}_full`"
            />
            <i
              class="far fa-star stars-empty"
              v-for="i in 5 - stars"
              :key="`${i}empty`"
            />
          </div>

          <div>
            {{ product.rating.rate }}/5 ({{ product.rating.count }} ratings)
          </div>
        </div>

        <button class="product_btn product_btn-add" @click="addToCart">
          ADD <i class="fas fa-shopping-cart" />
        </button>

        <button class="product_btn product_btn-heart" @click="addToFavorites">
          <i v-if="inFavorites === false" class="far fa-heart" />
          <i v-if="inFavorites === true" class="fas fa-heart" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Product } from "@/store";
import axios from "axios";

export default defineComponent({
  name: "ProductPage",
  data: () => ({
    loading: true,
    product: {} as Product,
    inFavorites: false,
    stars: 5,
  }),
  created() {
    const routerId = this.$route.params.id;

    axios
      .get(`https://fakestoreapi.com/products/${routerId}`)
      .then(({ data }) => {
        this.loading = false;
        this.product = data;
        this.stars = Math.round(this.product.rating.rate);
      });
  },
  methods: {
    addToFavorites() {
      this.inFavorites = !this.inFavorites;
    },

    addToCart(){
      console.log("ADD TO CART");
    }
  },
});
</script>

<style scoped lang="scss">
@import "../styles/helper";

.productPage {
  padding: 20px 10%;
}

.productPage__title_wrapper {
  margin-bottom: 30px;
}

.productPage__title {
  font-size: 28px;
  text-align: center;
}

.productPage__details_wrapper {
  display: flex;
  justify-content: space-between;
}

.productImg_wrapper {
  background-color: white;
  width: 35%;
  padding: 30px;
  transition: $trans_all;

  &:hover {
    box-shadow: $box_sh1;
  }
}

.productImg {
  object-fit: contain;
  width: 100%;
  column-gap: 50px;
}

.productInfo {
  width: 50%;
}

.productPage__desc {
  font-size: 20px;
  text-align: justify;
  line-height: 200%;
  margin-bottom: 50px;
}

.rating {
  margin-bottom: 50px;
}
.stars {
  font-size: 28px;
  display: flex;
  width: fit-content;
  margin-bottom: 10px;

  &:hover {
    .stars-gold {
      color: $col_main9;
    }

    .stars-empty {
      color: $col_main1;
    }
  }
}
.stars-gold {
  transition: $trans_all;
}

.stars-empty {
  transition: $trans_all;
}

.product_btn {
  border: none;
  background-color: $col_main3;

  font-family: "Roboto", sans-serif;
  font-size: 32px;
  padding: 12px 24px;
  text-decoration: none;
  color: $col_blk5;
  border-radius: 2px;
  cursor: pointer;

  transition: all linear 0.3s;

  &:hover {
    box-shadow: $box_sh1;

    &.product_btn-heart {
      background-color: #eeeeee;
    }
  }

  &:active {
    box-shadow: $box_sh2;
    color: $col_main1;

    &.product_btn-add {
      background-color: $col_main9;
    }

    &.product_btn-heart {
      background-color: #c0392b;
      color: #c0392b;
    }
  }
}

.product_btn-add {
}

.product_btn-heart {
  background-color: white;
  color: #c0392b;
}
</style>
