<template>
  <div>
    <div v-if='sortedProducts' class="block lg:flex lg:flex-wrap lg:justify-center">
      <div v-for='product in sortedProducts' 
           :key='product.id' 
           class="block shadow-lg m-4 lg:w-1/5 bg-white cursor-pointer"
           :class="[userPoints > product.cost ? 'transition duration-500 ease-in-out hover:bg-custom-light-blue transform hover:-translate-y-1 hover:scale-100' : 'transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100']"
           >

        <div v-if='userPoints > product.cost' class="absolute top-0 right-0 m-2">
          <wallet />
        </div>
        <div v-if='userPoints && userPoints < product.cost' class="flex absolute m-2 px-3 py-2 rounded-3xl opacity-80 bg-custom-gray">
          <div class="p-1 text-white text-xs">
            You need {{ product.cost - userPoints }}
          </div>
          <div class='pr-1'>
            <money />
          </div>
        </div>

        <div class='flex justify-center' >
          <img :src='product.img.url' />
        </div>
        <div class="text-left p-4">
          <div class="text-gray-300 ">
            {{ product.category }}
          </div>
          <div>
            {{ product.name }}
          </div>
        </div>

        <div v-if='userPoints > product.cost' class='px-8 py-16 absolute top-0 left-0 bottom-0 right-0 opacity-0 hover:opacity-100 transition duration-500 ease-in-out hover:bg-custom-light-blue'>
          <div class="absolute top-0 right-0 m-2">
            <white-wallet />
          </div>
          <div class="flex justify-center p-4 m-4">
            <div class='text-3xl text-white'>
              {{ product.cost }}
            </div>
            <div class='p-1 pl-2'>
              <money />
            </div>
          </div>
          <div @click='toggleModal(product)' class="flex justify-center p-4 m-4 border-solid bg-white rounded-3xl text-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
            Redeem now
          </div>  
        </div>
        <div v-for='redeemedProduct in redeemedProducts' :key='redeemedProduct'>
          <div v-if='product._id === redeemedProduct' class='px-8 py-16 absolute top-0 left-0 bottom-0 right-0 bg-custom-gray text-white opacity-80 cursor-not-allowed'>
            <div class="flex justify-center p-2 m-2 border-solid  rounded-3xl text-2xl">
              Product redeemed succesfully. Enjoy it!
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if='sortedProducts && sortedProducts.length === 0' class='block text-center text-3xl '>
      <lonely />
      <h3 class='mt-4'>Oops! We haven't found any product that matches your search</h3>
    </div>

    <div v-if='isOpenModal'>
      <redeem
        :isOpenModal='isOpenModal' 
        :product='productToRedeem'
        @toggleModal='onToggleModal'
        @redeem='onRedeem'
      />
    </div>
    
  </div>
</template>

<script>
import wallet from '@/assets/svg/wallet'
import money from '@/assets/svg/money';
import lonely from '@/assets/svg/lonely';
import whiteWallet from '../../../assets/svg/whiteWallet.vue';

import redeem from '@/components/inCardsAndSortBy/modal/redeem'

import { ref, inject } from 'vue'

export default {
  components: {  
    wallet ,
    money,
    whiteWallet,
    lonely,
    redeem
  },
  props: {
    sortedProducts: {
      type: Object,
      required: false
    },
    points: {
      type: Number,
      required: true,
    }
  },
  setup() {
    const emitter = inject("emitter");

    const userPoints = ref(null);
    emitter.on("userPointsLeft", (points) => {
      userPoints.value = points;
    });

    const isOpenModal = ref(false)
    const productToRedeem = ref(null)
    const toggleModal = (product) => {
      productToRedeem.value = product;
      isOpenModal.value = true;
    };

    const onToggleModal = (toggle) => {
      isOpenModal.value = toggle;
    }

    const redeemedProducts = ref([]);
    const onRedeem = (toggle, productRedeemed) => {
      isOpenModal.value = toggle;
      redeemedProducts.value.push(productRedeemed)
    }

    return {
      isOpenModal,
      toggleModal,
      onToggleModal,
      productToRedeem,
      redeemedProducts,
      onRedeem,
      userPoints
    }
  }
}
</script>

<style>

</style>