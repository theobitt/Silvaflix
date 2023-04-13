<template>
  <div class="section">
    
    <div class="search-box">
      <div class="search-bar">
        <input
        type="text"
        v-model="searchQuery"
        placeholder="Procure um filme..."
        />
        <div class="search-icon" @click="search">
          <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          >
          <path
          d="M16.2773 14.8193L20.4683 19.0103C20.7511 19.2932 20.7511 19.7677 20.4683 20.0506C20.1854 20.3334 19.7109 20.3334 19.428 20.0506L15.237 15.8596C14.1119 16.582 12.7096 17.0218 11.2567 17.0218C7.35771 17.0218 4.14844 13.8126 4.14844 9.91365C4.14844 6.01466 7.35771 2.80542 11.2567 2.80542C15.1557 2.80542 18.365 6.01466 18.365 9.91365C18.365 11.3669 17.9253 12.7692 17.2028 13.8943L16.2773 14.8193ZM11.2567 4.88197C8.05105 4.88197 5.77246 7.16056 5.77246 9.91365C5.77246 12.6667 8.05105 14.9452 11.2567 14.9452C14.4624 14.9452 16.741 12.6667 16.741 9.91365C16.741 7.16056 14.4624 4.88197 11.2567 4.88197Z"
          fill="#333333"
          />
        </svg>
      </div>
    </div>
    <div class="add-movie">
      <button @click="handleCadastro()">Cadastrar filme</button>
    </div>
    
  </div>
    <ListaFilmes />
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { CREATE_FILME, GET_FILMES } from "@/store/type-actions";
import fns from "@/format/date";
import useModal from "@/hooks/useModal";

import ListaFilmes from "@/components/ListaFilmes.vue";
// import ComponenteCard from "@/components/ComponenteCard.vue";

export default {
  name: "HomeView",
  components: {
    ListaFilmes,
    //  ComponenteCard
  },
  setup() {
    const modal = useModal();

    const store = useStore();
    const state = reactive({
      titulo: "",
      genero: "",
      dataLancamento: "",
      filmes: store.dispatch(GET_FILMES),
    });
    function handleCadastro(){
      modal.open({
        component: "ModalAddFilme",
      });
    }
    async function handleAddFilme() {
      const filme = {
        titulo: state.titulo,

        dataLancamento: new Date(state.dataLancamento).toISOString(),
        genero: state.genero,
      };
      await store.dispatch(CREATE_FILME, filme);
      state.filmes = await store.dispatch(GET_FILMES);
      alert("Filme criado.");
    }
    function handleFormat(date) {
      const data = fns.formatDateToView(new Date(date));
      return data;
    }
    onMounted(async () => {
      const filmes = await store.dispatch(GET_FILMES);
      state.filmes = filmes;
      console.log("filmes", state.filmes);
    });
    return {
      state,
      store,
      handleAddFilme,
      handleFormat,
      handleCadastro
    };
  },
};
</script>
<style scoped>
.home {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 20px; */
  background-color: var(--c-app-bg);
}
.section {
  padding: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--c-app-bg);
}
.search-box{
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5vh;
}
.add-movie {
  position: absolute;
  right: 40px;
}
.half-section-left {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  position: absolute;
  float: left;
  left: 0px;
  padding: 20px;
  background-color: darkslategrey;
}
.half-section-right {
  display: flex;
  padding: 20px;
  flex-direction: column;
  height: 100%;
  width: 50%;
  position: absolute;
  float: right;
  right: 0px;
  color: white;
  background-color: darkslategrey;
}
.card-cadastro {
  background-color: rgb(0, 128, 0, 0.8);
  height: 400px;
  width: 300px;
  padding: 20px;
  color: white;
  border-radius: 5vh;
}

h1 {
  color: white;
  font-size: 24px;
  padding: 10px;
}
h4 {
  font-size: 12px;
  /* float: left; */
  /* text-align: left; */
  /* position: relative; */
  font-weight: bold;
  margin-left: 0px;
}
.search-bar {
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 4px;
  padding: 4px 8px;
}

input {
  width: 70vh;
  flex-grow: 1;
  border: none;
  background-color: transparent;
  margin-right: 8px;
  border: none;
  outline: none;
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
button{
  padding: 5px;
  border: none;
  border-radius: 10px;
  width: 350px;
  color: white;
  font-weight: 400;
  background-color: red;
}
</style>
