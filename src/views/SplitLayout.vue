<template>
  <div class="full-height">
    <Splitter class="full-height split-parent surface-section">
      <SplitterPanel class="flex" :size="25" :minSize="15">
        <div class="flex flex-column align-items-stretch flex-1 gap-2">
          <div class="flex flex-1 pl-2 pt-2 pr-1 overflow-hidden">
            <div class="flex flex-1">
              <DocumentTree class="flex-1 surface-section" @node-selected="onNodeSelected" />
            </div>
          </div>

          <div class="pl-2 pt-1 pr-1 pb-2">
            <div>
              <DocumentTreeToolbar />
            </div>
          </div>
        </div>
      </SplitterPanel>

      <SplitterPanel class="hidden md:block lg:block md:flex lg:flex" :size="75" :minSize="25">
        <div class="pt-2 pr-2 pl-1 pb-1 flex flex-column align-items-stretch flex-1">
          <div class="flex flex-1 overflow-hidden split-main mb-1">
            <div class="flex flex-1 border-round-sm text-left p-1">
              <DocumentEditor v-if="editorSelected" :documentData="documentData" @saveSelected="onSaveSelected" @cancelSelected="onCancelSelected" />
              <div v-else class="scrollable pl-3">
                <DocumentViewer :documentData="documentData" :selectedNode="selectedNode" 
                                @editorSelected="onEditorSelected" @documentDeleted="onDocumentDeleted" />
              </div>
            </div>
          </div>
        </div>
      </SplitterPanel>
    </Splitter>

    <Dialog v-if="isSmall" v-model:visible="mobileViewerVisible" modal position="right" :dismissableMask="true">
      <template #closeicon>
        <i class="pi pi-chevron-left"></i>
      </template>

      <DocumentViewer :documentData="documentData" :selectedNode="selectedNode" />
    </Dialog>
  </div>
</template>

<script>
import DocumentTree from '@/components/DocumentTree.vue'
import DocumentTreeToolbar from '@/components/DocumentTreeToolbar.vue'
import DocumentViewer from '@/components/DocumentViewer.vue'
import DocumentEditor from '@/components/DocumentEditor.vue'

export default {
  name: 'SplitLayout',
  props: {
    isSmall: false
  },
  components: {
    DocumentTree,
    DocumentTreeToolbar,
    DocumentViewer,
    DocumentEditor
  },
  computed: {
    documentData() {
      return this.selectedNode === null ? '' : this.selectedNode.data
    }
  },
  data: function () {
    return {
      selectedNode: null,
      mobileViewerVisible: false,
      editorSelected: false
    }
  },
  methods: {
    onNodeSelected(node) {
      this.selectedNode = node

      if (this.isSmall) {
        this.mobileViewerVisible = true
      }
    },
    onEditorSelected() {
      this.editorSelected = true
    },
    onSaveSelected(data) {
      if (this.selectedNode !== null) {
        this.selectedNode.data = data
      }
      this.editorSelected = false
    },
    onCancelSelected() {
      this.editorSelected = false
    },
    onDocumentDeleted() {
      this.selectedNode = null
    }
  }
}
</script>

<style scoped>
.split-parent {
  display: flex;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  margin-top: -0.5rem;
  border: 0 !important;
  border-radius: 0 !important;
}

.split-main {
  border: 1px solid var(--surface-d);
  border-radius: 6px;
}
</style>

<style>
@media (max-width: 767px) {
  .p-splitter-gutter-handle {
    opacity: 0;
  }
}
</style>
