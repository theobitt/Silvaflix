<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="modal-container">
    <div class="card-cadastro">
      <form submit.prevent="handleAddFilme()">
        <h1>Cadastrar filme</h1>
        <div class="field">
          <h4>Título</h4>
          <input
            v-model="titulo"
            type="text"
            placeholder="Digite seu título favorito:"
          />
        </div>
        <div class="field">
          <h4>Gênero</h4>
          <input
            v-model="genero"
            type="text"
            placeholder="Digite o gênero do filme:"
          />
        </div>
        <div class="field">
          <h4>Data de lançamento</h4>
          <input v-model="dataLancamento" type="date" id="dateInput" />
        </div>
        <div class="field">
          <h4>Fotos</h4>
          <input type="file" id="imagem" @change="onFileSelected" />
        </div>
        <div class="buttons">
          <button class="button" @click="handleAddFilme()">Adicionar</button>
          <button class="button-cancel" @click="modal.close()">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useModal from "@/hooks/useModal";
import useStore from "@/store";
import { ref } from "vue";
import fns from "@/format/date";
import { CHANGE_FILME_STATUS, CREATE_FILME } from "@/store/type-actions";

export default {
  setup() {
    const modal = useModal();
    const store = useStore();
    const titulo = ref("");
    const genero = ref("");
    const dataLancamento = ref("");
    const imagem = ref(null);

    // const onFileSelected = event => {
    //   var fileReader = new FileReader();
    //   fileReader.readAsBinaryString(event.target.files[0], )
    //   imagem.value = new Blob(event.target.files[0], { type: ["image/png", "image/jpg", "img/jpeg"]})
    // };
    const onFileSelected = (event) => {
      const file = event.target.files[0];
      imagem.value = file;
    };

    async function handleAddFilme() {
      try {
      const filme = {
        Titulo: titulo.value,
        Genero: genero.value,
        DataLancamento: new Date(dataLancamento.value).toUTCString(),
        ImagemData: imagem.value
      }
      
      await store.dispatch(CREATE_FILME, filme);
      store.dispatch(CHANGE_FILME_STATUS, false);
      alert("Filme criado.");
      modal.close()
    }
    catch(error) {
      console.log(error)
    }
    }

    function handleFormat(date) {
      const data = fns.formatDateToView(new Date(date));
      return data;
    }

    return {
      modal,
      store,
      handleAddFilme,
      handleFormat,
      titulo,
      genero,
      dataLancamento,
      imagem,
      onFileSelected,
    };
  },
};
</script>

<style scoped>
.modal-container {
  height: 400px;
  width: 400px;
  padding: 20px;
  display: flex;
  background-color: var(--c-app-bg);
  flex-direction: column;
  align-content: center;
  justify-content: center;
  border: none;
  border-radius: var(--border-radius);
}
.card-cadastro {
  justify-content: center;
  display: flex;
  border: 3px solid var(--c-app-bg);
  flex-direction: column;
  height: 400px;
  background-color: var(--c-app-bg);
  color: white;
  border-radius: 5vh;
}
.field {
  /* display: flex;
  flex-direction: column; */
  justify-content: center;
  width: 100%;
}
.buttons {
  gap: 1vh;
  justify-content: center;
  align-content: center;
  display: flex;
  padding: 10px;
  flex-direction: row;
}
h1 {
  background-color: transparent;
  font-size: 24px;
  padding: 10px;
  text-shadow: 2px 2px rgb(0, 0, 0, 0.4);
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
  text-shadow: 2px 2px rgb(0, 0, 0, 0.4);
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
input::placeholder {
  font-size: 15px;
}
.button-cancel {
  padding: 10px;
  color: rgb(0, 0, 0);
  width: auto;
  border: 2px solid transparent;
  margin: none;
  margin-top: 3vh;
  border-radius: 10px;
  box-shadow: 2px 2px rgb(0, 0, 0, 0.4);
  background-color: rgb(253, 153, 153);
}
.button-cancel:hover {
  cursor: pointer;
  background-color: rgb(246, 95, 95);
  /* background-color: rgb(255, 0, 0); */
  color: rgb(0, 0, 0);
  /* border: 2px solid rgb(255, 0, 0); */
}
.button {
  background-color: rgb(255, 0, 0);
  padding: 10px;
  width: auto;
  color: white;
  border: 2px solid transparent;
  margin: none;
  margin-top: 3vh;
  border-radius: 10px;
  box-shadow: 2px 2px rgb(0, 0, 0, 0.4);
}
.button:hover {
  cursor: pointer;
  background-color: rgb(162, 2, 2);
  color: white;
  border: 2px solid rgb(162, 2, 2);
}
</style>
