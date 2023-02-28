<template>
  <div class="product-section-wrapper">
    <div class="products" v-if="products.length">
      <div class="products">
        <div class="fdsfs" style="width: 260px;" v-for="product in products">
          <ProductPreview v-if="product.active == 1 || product.author_id == userId" :product="product"/>
        </div>
      </div>
    </div>

    <div class="no-products" v-else>
      <h2>У вас нет товаров!</h2>
      <p>Зайдите в <a href="/catalogue" style="color: #FE6637">каталог товаров</a> и добавьте товар с правами-перепродажи</p>
    </div>
  </div>

</template>

<script>

import ProductPreview from "@/components/ProductPreview";
import {mapGetters} from "vuex";

export default {
  name: 'ProductsSection',
  components: {
    ProductPreview
  },
  props: {
    products: []
  },
  data(){
    return {
      userId: 0
    }
  },
  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
  },
  mounted() {
    this.userId = this.getCurrentProfile.id;
  }
}

</script>

<style lang="scss">


.product-section-wrapper {
  margin-top: 10px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  height: auto;

  .products{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 5px 0 5px 0;
    margin: 0 auto;
  }

  .no-products{
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
  }

}

@media screen and (max-width: 1500px) {
  .product-section-wrapper .products{
    width: 800px;
  }
  .product-section-wrapper .products {
    width: 800px;
  }
}

@media screen and (max-width: 500px) {
  .product-section-wrapper .products{
    width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .product-section-wrapper .products {
    width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .btns {
    justify-content: center;
  }
  .fdsfs {
    display: contents;
  }
}

@media screen and (max-width: 500px) {
  .products{
    width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .product-section-wrapper {
    width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .btns {
    justify-content: center;
  }
  .fdsfs {
    display: contents;
  }
}

</style>