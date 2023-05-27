import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      currentTheme: 'arya-blue',
      darkTheme: 'arya-blue'
    }
  },
  mutations: {
    toggleTheme (state) {
      state.currentTheme = state.currentTheme == 'arya-blue' ? 'saga-blue' : 'arya-blue'
    }
  },
  getters: {
    isDarkTheme(state) {
      return state.currentTheme === state.darkTheme
    }
  },
  actions: {
  },
  modules: {
  }
})
