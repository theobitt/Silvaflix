<template>
  <h4
    style="
      margin-bottom: -5vh;
      padding: 40px 40px 40px;
      font-weight: bold;
      color: white;
    ">
    Filmes selecionados!
  </h4>
  <div class="filmes-row">
    <div :v-if="state.status" class="each-movie" v-for="filme in state.filmes" :key="filme.id">
      <h3>
        {{ filme.titulo }}
      </h3>
      <p>{{ filme.genero }} - {{ handleFormat(filme.dataLancamento) }}</p>
      <img class="capa"
        :src="`data:image/png;base64,${filme.imagem}`"
        :title="filme.titulo"
      />
      <div @click="handleRemove(filme.id)" title="Excluir filme" class="bin-container">  
        <img class="bin" src="@/assets/svg/trash.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { CHANGE_FILME_STATUS, DELETE_FILME, GET_FILMES } from "@/store/type-actions";
import { computed } from "@vue/reactivity";

export default {
  name: "ListaFilmes",
  components: {},
  setup() {
    const store = useStore();
    const state = reactive({
      filmes: store.dispatch(GET_FILMES),
      status: Boolean
    });
    state.status = computed(() =>  store.state.filme.isUpdated);
    watchEffect(async() => {
      console.log("Atualizado? ", state.status)
      if(state.status == true){
        console.log("Atualizando! ", state.status)
        await handleReloadFilmes();
        state.status == false
        store.dispatch(CHANGE_FILME_STATUS, true);
        console.log("Atualizado! ", state.status)
      } else {
        state.status == false
        await handleReloadFilmes();
        store.dispatch(CHANGE_FILME_STATUS, true);
        console.log("Estava Atualizado! ", state.status)
        state.status == true
      }
    })
    function handleRemove(id) {
      store.dispatch(DELETE_FILME, id);
      alert("Deletado!");
      handleReloadFilmes();
    }
    function handleFormat(date) {
      const data = new Date(date).getFullYear();
      return data;
    }
    async function handleReloadFilmes() {
      const filmes = await store.dispatch(GET_FILMES);
      state.filmes = filmes;
    }
    onMounted(async () => {
      handleReloadFilmes();
    });
    return {
      state,
      store,
      handleFormat,
      handleReloadFilmes,
      handleRemove,
    };
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.filmes-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1vh;
}

.each-movie {
  flex: 1 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-content: baseline;
  border-radius: 10px;
  color: red;

  transform: scale(0.8);
  transition: 0.3s ease-in;
}

.capa {
  border-radius: 10px;
  height: 525px;
  width: 350px;
}

.each-movie:hover {
  transform: scale(0.9);
}
.bin{
  transform: scale(1);
  height: 32px;
  width: 32px;
  filter: invert(10%) sepia(100%) saturate(7320%) hue-rotate(1deg) brightness(98%) contrast(105%);
}
.bin-container{
  padding: 5px;
  /* transform: scale(1.0); */
  /* filter: invert(76%) sepia(13%) saturate(583%) hue-rotate(237deg)
  brightness(116%) contrast(10%); */
  position: relative;
  margin-right: 0rem;
  bottom: 2.5rem;
  background-color: rgba(34, 34, 34, 0.8);
  border-radius: 5px;
  cursor: pointer;
  
}

/* img {
  filter: invert(99%) sepia(3%) saturate(283%) hue-rotate(237deg)
    brightness(116%) contrast(100%);
} */
</style>
