<template>
  <div class="mt-3">
    <div class="pb-4">
      <label class="m-0 text-xs text-color-secondary" for="selected-parent">Selected Parent</label>
      <div class="mt-1 flex flex-wrap gap-2 align-content-center">
        <p id="selected-parent" class="m-0">{{ selectedParentNode?.label ?? 'Top Level' }}</p>
        <button v-if="selectedParentNode != null" class="clear-button" @click="clearParent">
          <span>
            <i class="pi pi-times clear-icon"></i>
          </span>
        </button>
      </div>
    </div>

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
      selectedParentNode: null,
    }
  },
  methods: {
    onNodeSelected(node) {
      this.selectedParentNode = node
    },
    clearParent() {
      this.selectedParentNode = null
    },
    cancel() {
      this.$emit('on-closed')
    },
    moveDocument() {
      this.$store.commit('moveWikiDocument', { node: this.selectedNode, parentNode: this.selectedParentNode })
      this.$emit('on-closed')
    }
  }
}
</script>

<style scoped>
.clear-button {
  border-radius: 50%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  line-height: 0;
  margin-top: 0.175rem;
}

.clear-button:hover {
  background-color: #f1749e0f;
}

.clear-icon {
  font-size: 0.8rem;
  color: var(--pink-300);
}
</style>