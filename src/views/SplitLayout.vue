<template>
  <div class="full-height">
    <Splitter class="full-height split-parent surface-section">
      <SplitterPanel class="flex" :size="20" :minSize="10">
        <div class="flex flex-column align-items-stretch flex-1 gap-2">
          <div class="flex flex-1 pl-2 pt-2 pr-1 overflow-hidden">
            <div class="flex flex-1">
              <DocumentTree class="flex-1 surface-section" @node-selected="onNodeSelected" />
            </div>
          </div>

          <div class="pl-2 pt-1 pr-1 pb-2">
            <div>
              <DocumentTreeToolbar @pageAdded="onPageAdded" />
            </div>
          </div>
        </div>
      </SplitterPanel>

      <SplitterPanel class="hidden md:flex lg:flex split-panel-main" :size="80" :minSize="20">
        <div class="pt-2 pr-2 pl-1 pb-1 flex flex-column align-items-stretch flex-1">
          <div class="flex flex-1 overflow-hidden split-main mb-1">
            <div class="flex flex-1 border-round-sm text-left p-1">
              <DocumentEditor v-if="editorSelected" :selectedNode="selectedNode" @saveSelected="onSaveSelected" 
                              @cancelSelected="onCancelSelected" :isMobile="isMobile" />
              <div v-else class="scrollable pl-3">
                <DocumentViewer :selectedNode="selectedNode" @editorSelected="onEditorSelected" 
                                @documentDeleted="onDocumentDeleted" @subPageAdded="onPageAdded"
                                :isMobile="isMobile" @closeRequested="onCloseRequested" />
              </div>
            </div>
          </div>
        </div>
      </SplitterPanel>
    </Splitter>

    <Dialog v-if="isMobile" v-model:visible="mobileViewerVisible" modal position="right" 
            @after-hide="onMobileViewerHidden" :closable="false">
      <template #header>
        <Button icon="pi pi-chevron-left" text rounded plain @click="mobileViewerVisible = false"/>
        <div class="w-full ml-2 document-title-parent">
          <p class="font-bold document-title">{{ this.selectedNode?.label ?? '' }}</p>
        </div>
      </template>
      <DocumentViewer :selectedNode="selectedNode" @documentDeleted="onDocumentDeleted"
                      @editorSelected="onEditorSelected" @subPageAdded="onPageAdded"
                      :isMobile="isMobile" @closeRequested="onCloseRequested" />
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
    isMobile: false
  },
  components: {
    DocumentTree,
    DocumentTreeToolbar,
    DocumentViewer,
    DocumentEditor
  },
  data: function () {
    return {
      selectedNode: null,
      mobileViewerVisible: false,
      editorSelected: false,
    }
  },
  methods: {
    onNodeSelected(node) {
      this.selectedNode = node
      this.editorSelected = false

      if (this.isMobile) {
        this.mobileViewerVisible = true
      }
    },
    onEditorSelected() {
      this.editorSelected = true
    },
    onSaveSelected(data) {
      if (this.selectedNode !== null) {
        this.selectedNode.label = data.title
        this.selectedNode.data = data.text
      }
      this.editorSelected = false
    },
    onCancelSelected() {
      this.editorSelected = false
    },
    onDocumentDeleted() {
      this.selectedNode = null
      if (this.isMobile) {
        this.mobileViewerVisible = false
      }
    },
    onPageAdded(page) {
      this.selectedNode = page
      this.editorSelected = true
      if (this.isMobile) {
        this.mobileViewerVisible = true
      }
    },
    onMobileViewerHidden() {
      this.editorSelected = false
    },
    onCloseRequested() {
      this.editorSelected = false
      if (this.isMobile) {
        this.mobileViewerVisible = false
      }
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

.split-panel-main {
  min-width: 0;
}

.p-splitter-horizontal > .p-splitter-gutter {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
