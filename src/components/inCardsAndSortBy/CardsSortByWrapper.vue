<template>
  <div class='bg-aerolab-main p-4'>
    <div class="block lg:flex lg:mx-20 mb-4 border-b-2">
      <sort-by 
        :products-total='productsData'
        @sort='onSortSelected'
        @search='onSearchProduct'
      />
    </div>
    <div v-if='userData'>
      <products 
        :sorted-products='sortedProducts'
        :points='userData.points'
      />
    </div>
  </div>
</template>

<script>
import sortBy from '@/components/inCardsAndSortBy/sort/sortBy';
import products from '@/components/inCardsAndSortBy/cards/products';

import { ref, onMounted, computed, inject } from "vue";
import { useStore } from 'vuex';

export default {
  components: {
    sortBy,
    products,
  },
  setup() {
    const store = useStore();
    const emitter = inject("emitter");

    const userPoints = ref(null);
    emitter.on("userPointsLeft", (points) => {
      userPoints.value = points;
    });

    const userData = computed(() => store.state.user.data);
    const productsData = computed(() => store.state.products);

    const sortedProducts = computed(() => {
      switch(sortCategory.value) {
        case '': {
          return productsData.value.data;
        }
        case searchProduct.value: {
          return productsData.value.data
            .filter(product => 
              (product.category.toLowerCase().includes(searchProduct.value.toLowerCase()) ||
              (product.name.toLowerCase().includes(searchProduct.value.toLowerCase()))
          ))
        }
        case 'lowest-to-highest': {
          let lowestPrice = productsData.value;
          lowestPrice.data.sort((a, b) => a.cost - b.cost);
        }
        break;
        case 'highest-to-lowest': {
          let highestPrice = productsData.value;
          highestPrice.data.sort((a, b) => b.cost - a.cost);
        }
        break;
        case 'redeemable': {
          return productsData.value.data.filter(product => userPoints.value > product.cost)
        }
        case 'not-redeemable': {
          return productsData.value.data.filter(product => userPoints.value < product.cost)
        }
      }
      return productsData.value.data;
    })

    const sortCategory = ref('');
    const onSortSelected = (type) => {
      sortCategory.value = type;
    }

    const searchProduct = ref('')
    const onSearchProduct = (productSearched) => {
      sortCategory.value = productSearched;
      searchProduct.value = sortCategory.value;
    }

    onMounted(() => {
      store.dispatch('GET_USER');
      store.dispatch('GET_PRODUCTS');
    });

    return {
      productsData,
      userData,
      onSortSelected,
      onSearchProduct,
      sortedProducts,
      sortCategory,
      searchProduct,
      userPoints
    };
  }
}
</script>