<template>
  <div class="mt-4">
    <Tree class="surface-section" :value="documentData" :filter="true" filterMode="lenient" 
          filterPlaceholder="Search documents..." :metaKeySelection="false" selectionMode="single" 
          @node-select="onNodeSelected" scrollHeight="flex" />

    <div class="mt-4 flex flex-wrap gap-3 justify-content-end">
        <Button label="Cancel" @click="cancel" text />
        <Button label="Move" @click="moveDocument" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Move',
  props: {
    selectedNode: null
  },
  computed: {
    documentData() {
      return this.$store.state.wikiDocuments
    }
  },
  emits: [ 'on-closed' ],
  data: function() {
    return {
      selectedParentNode: null
    }
  },
  methods: {
    onNodeSelected(node) {
      this.selectedParentNode = node
    },
    cancel() {
      this.$emit('on-closed')
    },
    moveDocument() {
      if (this.selectedNode !== null && this.selectedParentNode !== null) {
        this.$store.commit('moveWikiDocument', { node: this.selectedNode, parentNode: this.selectedParentNode })
        this.$emit('on-closed')
      }
    }
  }
}
</script>

<style>
</style>