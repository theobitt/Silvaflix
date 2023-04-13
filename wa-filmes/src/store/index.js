import { createStore, useStore as vuexUseStore } from "vuex";
import { filme } from './modules/filme'

export const store = createStore({
  state: {
    filme: {
      filmes: [],
      updateFilme: {},
      totalPaginas: 0,
      filmeId: 0,
      isUpdated: true
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    filme
  }
})

export default function useStore() {
  return vuexUseStore();
}