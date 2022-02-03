import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos:[],
    idCount:1,
  },
  mutations: {
    updateTodos(state,value){
      state.todos = value
    },
    incrementId (state) {
      state.idCount++
    }
  },
  actions: {
    updateTodos({commit},value){
      commit('updateTodos', value)
    },

    incrementId ({commit}) {
      commit('incrementId')
    }
  },
  modules: {
  }
})
