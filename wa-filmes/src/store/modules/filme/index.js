import services from "@/services";
import  {store}  from "@/store";
import {
  CREATE_FILME,
  DELETE_FILME,
  GET_FILMES,
  GET_FILME_POR_ID,
  UPDATE_FILME,
  UPLOAD_DATA_FILME,
  SAVE_FILME_ID,
  CHANGE_FILME_STATUS,
} from "@/store/type-actions";
import {
  ADD_FILME,
  CHANGE_FILME,
  CHANGE_DATA_FILME,
  SET_FILMES,
  VALUE_FILME,
  REMOVE_FILME,
  SET_FILME_POR_ID,
  SET_FILME_ID,
  SET_UPDATE_STATUS,
} from "@/store/type-mutations";

export const filme = {
  mutations: {
    [SET_FILMES](state, filmes) {
      state.filmes = filmes;
    },
    [SET_FILME_POR_ID](state, filme) {
      state.updateFilmePorId = filme;
    },
    [ADD_FILME](state, filme) {
      state.filmes.push(filme);
    },
    [CHANGE_FILME](state, filme) {
      const index = state.filmes.findIndex((f) => f.id === filme.id);
      state.filmes[index] = filme;
    },
    [CHANGE_DATA_FILME](state, filme) {
      state.updateFilme = filme;
    },
    [REMOVE_FILME](state, id) {
      state.filmes = state.filmes.filter((f) => f.id != id);
    },
    [SET_FILME_ID](state, id) {
      state.filmeId = id;
    },
    [SET_UPDATE_STATUS](state, boolean){
      state.isUpdated = boolean;
    }

  },
  actions: {
    async [GET_FILMES]({ commit }) {
      try {
        let url = "/Filme";
       

        const { data } = await services.filmes.getFilmes(url);

        commit(SET_FILMES, data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async [GET_FILME_POR_ID]({ commit }, idFilme) {
      try {
        const { data } = await services.filmes.getFilmePorId(idFilme);

        commit(SET_FILME_POR_ID, data);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async [CREATE_FILME]({ commit }, filme) {
      try {
        const { data } = await services.filmes.createFilme(filme)
        store.dispatch(SAVE_FILME_ID, data.id);
        commit(SET_FILME_ID, data.id)
        store.dispatch(GET_FILMES);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    [CHANGE_FILME_STATUS]({ commit }, boolean) {
      commit(SET_UPDATE_STATUS, boolean);
      console.log(store.state.filme.isUpdated, "Status dentro da store")
    },
    async [UPDATE_FILME]({ commit }, filme) {
      try {
        const { data } = await services.filmes.updateFilme(filme);

        commit(CHANGE_FILME, data);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    [UPLOAD_DATA_FILME]({ commit }, filme) {
      commit(CHANGE_DATA_FILME, filme);
    },
    async [DELETE_FILME]({ commit }, id) {
      try {
        await services.filmes.deleteFilme(id);

        commit(REMOVE_FILME, id);
      } catch (error) {
        console.log(error);
      }
    },
    [SAVE_FILME_ID]({ commit }, id) {
      commit(SET_FILME_ID, id);
    },
  },
  getters: {
    [VALUE_FILME](state) {
      return state.filmes;
    },
  },
};
