<template>
  <div class="productCard__wrapper">
    <router-link
      :to="`/${product.category}/${product.id}`"
      class="productCard__img_wrapper"
    >
      <img class="productCard__img" :src="product.image" :alt="product.title" />
    </router-link>
    <div>
      <h3 class="productCard__name">{{ product.title }}</h3>
      <h4 class="productCard__price">{{ formatPrice() }}</h4>
    </div>
    <div class="productCard__add_wrapper">
      <h2 class="productCard__add">ADD TO CART</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Product } from "@/store";

export default defineComponent({
  name: "ProductCard",
  props: {
    product: Object as () => Product,
  },
  methods: {
    formatPrice() {
      const price = parseInt(this.product?.price || "").toFixed(2);
      return `${price} €`;
    },
  },
});
</script>

<style scoped lang="scss">
@import "../styles/helper";

.productCard__img {
  object-fit: contain;
  height: 200px;
  transform: scale3d(0.95, 0.95, 0.95);
}

.productCard__wrapper {
  position: relative;

  padding: 20px;
  flex-direction: column;
  background-color: white;
  transition: all linear 0.3s;
  justify-content: space-between;
  border-radius: 2px;

  &:hover {
    box-shadow: $box_sh1;
    color: $col_blk4;
    border-radius: 2px 2px 0 0;

    .productCard__add_wrapper {
      display: flex;
    }
    .productCard__img {
      transform: scale3d(1, 1, 1);
    }
  }
}

.productCard__img_wrapper {
  height: 200px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  position: relative;

  & .productCard__img {
    width: 100%;
    transition: transform 1s ease-in-out;
  }
}

.productCard__name {
  font-family: $font;
  color: $col_blk5;
  text-align: justify;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
}

.productCard__price {
  text-align: center;
}

.productCard__add_wrapper {
  position: absolute;
  display: none;
  opacity: 1;
  width: 100%;
  left: 0;
  bottom: -50px;
  height: 50px;
  background-color: $col_main6;
  z-index: 10;
  transition: $trans_all;
  box-shadow: $box_sh1;
  color: white;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: #280680;
  }

  &:active {
    color: #9162e4;
  }
}

.productCard__add {
  font-size: 24px;
  font-family: $font;
}
</style>
