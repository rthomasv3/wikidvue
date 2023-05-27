<template>
  <div class="grid full-height">
      <div class="flex col-12 md:col-3 lg:col-3">
        <div class="flex flex-column align-items-stretch flex-grow-1 gap-2">
          <div class="flex flex-grow-1">
            <div class="flex flex-grow-1">
              <DocumentTree class="flex-grow-1" @node-selected="onNodeSelected" />
            </div>
          </div>

          <div>
            <div class="text-center p-3 border-round-sm bg-blue-500 font-bold text-white">
              1 Bottom
            </div>
          </div>
        </div>
      </div>

      <div class="hidden md:block lg:block md:col lg:col md:flex lg:flex">
        <div class="flex flex-column align-items-stretch flex-grow-1">
          <div class="flex flex-grow-1">
            <div class="flex flex-grow-1 pl-3 pr-3 pb-3 border-round-sm text-left">
              <DocumentEditor v-if="editorSelected" />
              <DocumentViewer v-else :documentData="documentData" />
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import DocumentTree from '@/components/DocumentTree.vue'
import DocumentViewer from '@/components/DocumentViewer.vue'
import DocumentEditor from '@/components/DocumentEditor.vue'

export default {
  name: 'FixedLayout',
  props: {
    isSmall: false
  },
  components: {
    DocumentTree,
    DocumentViewer,
    DocumentEditor,
    DocumentEditor
},
  data: function () {
    return {
      documentData: null,
      editorSelected: false
    }
  },
  methods: {
    onNodeSelected(node) {
      if (node.data !== null) {
        this.documentData = node.data
      }
    }
  }
}
</script>

<style scoped>

</style>
