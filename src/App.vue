<template>
  <div id="app">
    <NavBar/>
    <router-view />
  </div>
</template>



<script>
import NavBar from "./components/NavBar";
export default {
  components:{
    NavBar
  },
  name: "App",
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

</style>
