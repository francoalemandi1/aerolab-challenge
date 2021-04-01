<template>
  <div>
    <div class="block lg:flex mt-4 p-2">
      <div v-if='productsTotal.data' class="text-left lg:text-center border-r-2 mt-4 mb-2 px-4">
        {{ productsTotal.data.length }} of {{ productsTotal.data.length }} products
      </div>
      <div class="flex">
        <div class="flex flex-wrap">
          <div class="p-2 m-2">
            Sort by:
          </div>
          <div @click='sort("lowest-to-highest")' 
              class="p-2 lg:mx-2 m-2 bg-custom-light-gray rounded-2xl cursor-pointer" 
              :class="[toggleSelectedSortType === 'lowest-to-highest' ? 'bg-custom-light-blue text-white' : '']"
          >
            Lowest price
          </div>
          <div @click='sort("highest-to-lowest")' 
              class="p-2 lg:mx-2 m-2 bg-custom-light-gray rounded-2xl cursor-pointer" 
              :class="[toggleSelectedSortType === 'highest-to-lowest' ? 'bg-custom-light-blue text-white' : '']"
          >
            Highest price
          </div>
          <div @click='sort("redeemable")' 
              class="p-2 lg:mx-2 m-2 bg-custom-light-gray rounded-2xl cursor-pointer" 
              :class="[toggleSelectedSortType === 'redeemable' ? 'bg-custom-light-blue text-white' : '']"
          >
            Redeemable
          </div>
          <div @click='sort("not-redeemable")' 
              class="p-2 lg:mx-2 m-2 bg-custom-light-gray rounded-2xl cursor-pointer" 
              :class="[toggleSelectedSortType === 'not-redeemable' ? 'bg-custom-light-blue text-white' : '']"
          >
            No redeemable
          </div>
        </div>
      </div>
      <div class="block text-left lg:flex lg:m-2">
        <input v-model='productSearched' placeholder='Name or category' class="rounded-3xl px-6 py-2 lg:py-0 ml-2" />
        <button @click='searchProduct(productSearched)' class="rounded-3xl bg-custom-light-gray px-4 py-2">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    productsTotal: {
      type: Object,
      required: true,
    }
  },
  setup(props, { emit }) {
    const productSearched = ref('')
    const searchProduct = (param) => {
      productSearched.value = param
      toggleSelectedSortType.value = '';
      emit('search', param);
    }
    
    const toggleSelectedSortType = ref('');
    const sort = (sortType) => {
      toggleSelectedSortType.value = sortType;
      emit('sort', sortType);
    };
    return {
      sort,
      toggleSelectedSortType,
      searchProduct,
      productSearched
    }
  }
}
</script>

<style>

</style>