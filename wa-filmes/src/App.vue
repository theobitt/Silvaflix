<template>
  <ModalFactory/>
  <nav>
    <router-link to="/">
    <h1>SILVAFLIX</h1>
   <a>

     Era só mais um silva...
   </a>
  </router-link>
</nav>
<router-view />
</template>
<script>
import ModalFactory from "@/components/ModalFactory";
export default {
  components:{
    ModalFactory
  }
}
</script>
<style>
@import "./assets/styles/default.css";
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
* {
  padding: 0;
  margin: 0 auto;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  /* background-color: rgb(38, 38, 38); */
}
#app {
  text-shadow: 2px 2px rgb(0, 0, 0, .4);
  color: white;
  background-color: darkslategrey;
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  display: flex;
  padding: 30px;
  background-color: rgb(38, 38, 38);
}
nav a {
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  cursor: default;
}

nav a.router-link-exact-active {
  color: #ffffff;
}
h1{
  color: red;
}
a{
  font-weight: lighter;
  font-size: 12px;
}
</style>
