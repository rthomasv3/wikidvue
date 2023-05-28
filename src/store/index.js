import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      currentTheme: 'arya-blue',
      darkTheme: 'arya-blue',
      lightTheme: 'saga-blue',
      markdownThemes: [
        'cyanosis',
        'default',
        'github',
        'mk-cute', 
        'smart-blue', 
        'vuepress', 
      ],
      selectedMarkdownTheme: 'github',
      codeThemes: [
        'a11y',
        'atom',
        'github',
        'gradient',
        'kimbie',
        'paraiso',
        'qtcreator',
        'stackoverflow',
      ],
      selectedCodeTheme: 'github',
      showCodeLineNumbers: false,
      tabWidth: 2
    }
  },
  mutations: {
    toggleTheme (state) {
      state.currentTheme = state.currentTheme == state.darkTheme ? state.lightTheme : state.darkTheme
    },
    setMarkdownTheme(state, selectedTheme) {
      state.selectedMarkdownTheme = selectedTheme
    },
    setCodeTheme(state, selectedTheme) {
      state.selectedCodeTheme = selectedTheme
    },
    setShowCodeLineNumbers(state, showCodeLineNumbers) {
      state.showCodeLineNumbers = showCodeLineNumbers
    },
    setTabWidth(state, tabWidth) {
      state.tabWidth = tabWidth
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
