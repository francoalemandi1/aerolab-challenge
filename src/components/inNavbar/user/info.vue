<template>
  <div>
    <div  v-if='user' class="flex p-4">
      <div class='p-2'>
        {{ user.name }}
      </div>
      <div class="flex bg-custom-light-gray rounded-2xl p-2 mx-2">
        <div class='mx-2'>
          {{ points }}
        </div>
        <div>
          <money />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted, computed } from "vue";
import { useStore } from 'vuex';

import money from '@/assets/svg/money';

export default {
  components: {
    money
  },
  setup() {
    const emitter = inject("emitter");

    const productCost = ref([]);
    emitter.on("product-cost", (cost) => {
      productCost.value.push(cost);
    });

    const points = computed(() => {
      let cost = productCost.value;
      let points = user.value.points;

      let sum = cost.reduce((a, b) => a + b, 0);

      let result = points - sum;

      emitter.emit("userPointsLeft", result);

      return result;
    })
    
    const store = useStore();
    const user = computed(() => store.state.user.data);

    onMounted(() => {
      store.dispatch('GET_USER');
    });

    return {
      user,
      productCost,
      points
    }
  }
}
</script>