<template>
        <div class="card-cadastro">
          <form submit.prevent="handleAddFilme()">
            <h1>Cadastrar filme</h1>
            <div class="field">
              <h4>Título</h4>
              <input v-model="state.titulo" type="text" placeholder="Digite seu título favorito:"/>
            </div>
            <div class="field">
              <h4>Gênero</h4>
              <input v-model="state.genero" type="text" placeholder="Digite o gênero do filme:" />
            </div>
            <div class="field">
              <h4>Data de lançamento</h4>
              <input v-model="state.dataLancamento" type="date" id="dateInput" />
            </div>
            <div class="field">
              <h4>Fotos</h4>
              <input type="file" @change="handleFileSelect">
            </div>
            <button @click="handleAddFilme()">adicionar</button>
          </form>
        </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { CREATE_FILME, GET_FILMES } from "@/store/type-actions";
import fns from "@/format/date";

export default {
  name: "ComponenteCard",
  components: {   },

  setup() {
    const store = useStore();
    const state = reactive({
      titulo: "",
      genero: "",
      dataLancamento: "",
      imagem: null,
      filmes: store.dispatch(GET_FILMES),
    });

    // async function handleUploadPhoto($event){
                
    //             const image = $event.target.files[0];
    //             const reader = new FileReader();
    //             reader.readAsDataURL(image);
    //             console.log(image, "imagem:")
    //             state.photos = image
    //             // reader.onload = e =>{
    //             //     this.previewImage = e.target.result;
    //             //     console.log(this.previewImage);
    //             // };

    //   } 
    const handleFileSelect = (event) => {
      state.imagem = event.target.files[0]
    }

    
    
    async function handleAddFilme() {
      const formData = new FormData()
      formData.append('titulo', state.titulo)
      formData.append('genero', state.genero)
      formData.append('dataLancamento', state.dataLancamento)
      formData.append('imagem', state.imagem)
      await store.dispatch(CREATE_FILME, formData);
      state.filmes = await store.dispatch(GET_FILMES);
      alert("Filme criado.");
    }


    function handleFormat(date){
      const data = fns.formatDateToView(new Date(date))
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
      handleFileSelect
    };
  },
};
</script>
<style scoped>
.card-cadastro {
  display: flex;
  flex-direction: column;
  background-color: rgb(0, 128, 0, 0.8);
  height: 400px;
  width: 300px;
  padding: 20px;
  color: white;
  border-radius: 5vh;
}
.field {
  /* display: flex;
  flex-direction: column; */
  width: 100%;
}
h1 {
  background-color: transparent;
  font-size: 24px;
  padding: 10px;
  text-shadow: 2px 2px rgb(0, 0, 0, .4);
}
h4 {
  margin-bottom: 1px;
  margin-top: 5px;
  font-size: 12px;
  float: left;
  /* text-align: left; */
  /* position: relative; */
  font-weight: bold;
  margin-left: 0px;
  text-shadow: 2px 2px rgb(0, 0, 0, .4);
}
input {
  width: 100%;
  padding: 5px;
  border-radius: 0.4rem;
  border: none;
  outline: none;
  margin: none;
}
input:active {
  border: none;
  outline: none;
  margin: none;
}
input::placeholder{
  font-size: 15px;
}
button{
  padding: 10px;
  width: 100%;
  border: 2px solid transparent;
  margin: none;
  margin-top: 3vh;
  border-radius: 10px;
  box-shadow: 2px 2px  rgb(0, 0, 0, .4);

}
button:hover{
  cursor: pointer;
  background-color: rgb(0, 100, 0);
  color: white;
  border: 2px solid rgb(0, 100, 0);

}
</style>
