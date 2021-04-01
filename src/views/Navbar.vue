<template>
  <div class="flex justify-between">
    <aerolab />
    <info />
  </div>

</template>

<script>
import aerolab from '@/components/inNavbar/logo/aerolab';
import info from '@/components/inNavbar/user/info';
export default {
  components: { aerolab, info },
  name: 'Navbar'
}
</script>

<style>

</style>