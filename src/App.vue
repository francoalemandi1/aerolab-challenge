<template>
  <div>
    <Navbar />
    <Header />
    <Main />
  </div>
</template>

<script>
import Navbar from '@/views/Navbar';
import Header from '@/views/Header';
import Main from '@/views/Main';


export default {
  components: {
    Navbar,
    Header,
    Main
  },
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
