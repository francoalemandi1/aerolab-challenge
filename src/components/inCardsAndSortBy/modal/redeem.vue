<template>
<div v-if='isOpenModal' class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="block justify-center mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h2 class="text-xl text-center leading-6 font-medium text-gray-900" id="modal-title">
              Great! You are one step away from getting the product you always wanted
            </h2>
            <img :src='product.img.url' class="ml-auto mr-auto" />
            <div class="mt-2">
              <p class="text-sm text-center text-gray-500">
                You will redeem the {{ product.name }} product for a cost of {{ product.cost}} points.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button @click="redeem(false, product._id, product.cost)" type="button" class="m-1 mt-3 w-full inline-flex justify-center bg-custom-light-blue text-white rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Redeem
        </button>
        <button @click='toggleModal(false)' type="button" class="m-1 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { inject } from 'vue'

export default {
  props: {
    isOpenModal: {
      type: Boolean,
      required: false,
      default: false,
    },
    product: {
      type: Object,
      required: false
    }
  },
  setup(props, { emit }) {
    const emitter = inject("emitter");

    const toggleModal = (toggle) => {
      emit('toggleModal', toggle); 
    };
    
    const redeem = (toggle, productId, productCost) => {
      // Comunica al padre que cierre el toggle y le pasa el costo del producto
      emit('redeem', toggle, productId)

      // Emite a componentes sin relación padre-hijo el costo del producto.
      emitter.emit("product-cost", productCost || 0);
    };

    return {
      toggleModal,
      redeem,
    }
  }
}
</script>