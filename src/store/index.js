import { createStore } from 'vuex'

function removeNode(nodes, nodeKey) {
  var removed = false

  for (var i = 0; (i < nodes?.length ?? 0) && !removed; ++i) {
    if (nodes[i].key === nodeKey) {
      nodes.splice(i, 1)
      removed = true
    }
    else if (nodes[i].children !== null) {
      removed = removeNode(nodes[i].children, nodeKey)
    }
  }

  return removed
}

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
      tabWidth: 2,
      selectedWiki: null,
      wikiDocuments: [ ]
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
    },
    setWikiDocuments(state, documents) {
      state.wikiDocuments = documents
    },
    moveWikiDocument(state, moveRequest) {
      if (moveRequest !== null) {
        var node = moveRequest.node
        var parentNode = moveRequest.parentNode

        if (node !== null && parentNode !== null && node.key !== parentNode.key) {
          if (parentNode.children === null || parentNode.children === undefined) {
            parentNode.children = [ ]
          }
          removeNode(state.wikiDocuments, node.key)
          parentNode.children.push(node)
        }
      }
    },
    deleteWikiDocument(state, nodeKey) {
      removeNode(state.wikiDocuments, nodeKey)
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
