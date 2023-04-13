<template>
  <div  class="navbar">
    <nav >
      <router-link to="/livros">Home</router-link>
      <router-link to="/cadastrar">Cadastro</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarComponent",
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: absolute;
  background: rgb(42,42,42);
background: linear-gradient(52deg, rgba(42,42,42,1) 2%, rgba(38,38,38,1) 92%);
  height: 80px;
  justify-content: center;
}
nav{
    background-color: transparent;
}
nav a{
    background-color: transparent;
    
}
</style>
