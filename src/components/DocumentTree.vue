<template>
  <Tree :value="documentData" :filter="true" filterMode="lenient" filterPlaceholder="Search documents..."
        :metaKeySelection="false" selectionMode="single" @node-select="onNodeSelected"
        scrollHeight="flex" />
</template>

<script>
import documents from '../assets/data/documents.json';
const fullDocument = require('../assets/data/full-document.txt');

export default {
  name: 'DocumentTree',
  computed: {
    documentData() {
      return this.$store.state.wikiDocuments
    }
  },
  mounted() {
    documents[0].data = fullDocument
    this.$store.commit('setWikiDocuments', documents)
  },
  methods: {
    onNodeSelected(node) {
      this.$emit('node-selected', node)
    }
  }
}
</script>

<style scoped>
</style>
