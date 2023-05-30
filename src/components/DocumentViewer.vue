<template>
  <div ref="viewer" class="flex flex-column flex-grow-1 h-full">
    <Toast />

    <SpeedDial v-if="selectedNode && !isPreview" class="mr-5 mb-4" :model="items" :radius="120" type="quarter-circle" 
               buttonClass="small-dial" direction="up-left" :style="{ right: 0, bottom: 0 }" 
               :transitionDelay="90" />

    <div v-if="selectedNode && !isMobile" class="document-title-parent document-title-parent-padded">
      <h1 class="mb-0 mt-2 document-title">{{ selectedNode.label }}</h1>
      <Divider />
    </div>

    <MdPreview v-if="selectedNode" :key="key" :modelValue="documentData" language="en-US" :theme="theme" 
               :previewTheme="markdownTheme" :codeTheme="codeTheme" :showCodeRowNumber="showCodeLineNumbers" 
               :mdHeadingId="mdHeadingId" />
    <div v-else class="flex flex-column flex-grow-1 h-full w-full justify-content-center align-items-center">
      <p class="text-color-secondary">No Document Selected</p>
    </div>

    <Dialog v-model:visible="moveVisible" modal header="Move Document" 
            :style="{ minWidth: '35vw', maxWidth: isMobile ? '100vw' : '35vw' }" 
            :dismissableMask="true">
      <Move :selectedNode="selectedNode" @onClosed="moveClosed" />
    </Dialog>

    <ConfirmDialog></ConfirmDialog>

    <Dialog v-if="isMobile" v-model:visible="mobileEditorVisible" modal position="right" :closable="false">
      <template #header>
        <Button icon="pi pi-chevron-left" text rounded plain @click="mobileEditorVisible = false"/>
        <div class="w-full ml-2 document-title-parent">
          <p class="font-bold document-title">{{ this.selectedNode?.label ?? '' }}</p>
        </div>
      </template>
      <DocumentEditor :selectedNode="selectedNode" @saveSelected="onSaveSelected" 
                      @cancelSelected="onCancelSelected" :isMobile="isMobile" />
    </Dialog>
  </div>
</template>

<script>
import { MdPreview } from 'md-editor-v3';
import { getHeaderId } from "../services/headerService";
import { exportDocument} from '../services/exportService';
import Move from '@/components/Move.vue'
import DocumentEditor from '@/components/DocumentEditor.vue'

export default {
  name: 'DocumentViewer',
  props: {
    selectedNode: null,
    isMobile: false,
    isPreview: false
  },
  components: {
    MdPreview,
    Move,
    DocumentEditor
  },
  computed: {
    theme() {
      return this.$store.getters.isDarkTheme ? 'dark' : 'light'
    },
    markdownTheme() {
      return this.$store.state.selectedMarkdownTheme
    },
    codeTheme() {
      return this.$store.state.selectedCodeTheme
    },
    showCodeLineNumbers() {
      return this.$store.state.showCodeLineNumbers
    },
    documentData: {
      get() {
        return this.selectedNode?.data ?? ''
      },
      set(data) {
        this.selectedNode.data = data
      }
    }
  },
  data: function () {
    return {
      key: 0,
      items: [ 
        {
          label: 'Edit', 
          icon: 'pi pi-pencil', 
          command: () => {
            if (this.isMobile) {
              this.mobileEditorVisible = true
            }
            else {
              this.$emit('editor-selected')
            }
          } 
        },
        {
          label: 'Add Subpage', 
          icon: 'pi pi-plus',
          command: () => {
            if (this.selectedNode !== null) {
              if (this.selectedNode.children === null || this.selectedNode.children === undefined) {
                this.selectedNode.children = [ ]
              }
              var subPage = { key: -1, label: 'Title', data: '' }
              this.selectedNode.children.push(subPage)
              this.selectedNode.children.sort((x,y) => { return x.label.localeCompare(y.label) })
              this.$emit('sub-page-added', subPage)
            }
          } 
        },
        {
          label: 'Move', 
          icon: 'pi pi-file-export',
          command: () => { this.moveVisible = true } 
        },
        {
          label: 'Download', 
          icon: 'pi pi-download',
          command: () => { exportDocument(this.selectedNode.data, this.selectedNode.label + '.md') } 
        },
        {
          label: 'Delete', 
          icon: 'pi pi-trash',
          command: () => {
            if (this.selectedNode !== null) {
              this.$confirm.require({
                message: 'Are you sure you want to delete ' + this.selectedNode.label + '?',
                header: 'Delete Document',
                icon: 'pi pi-question-circle',
                acceptClass: 'pr-4 p-button-danger',
                rejectClass: 'pr-4 p-button-text',
                accept: () => {
                  this.$store.commit('deleteWikiDocument', this.selectedNode.key)
                  this.$emit('document-deleted')
                  this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Deleted ' + this.selectedNode.label, life: 3000 })
                  this.$confirm.close()
                },
                reject: () => { this.$confirm.close() }
              });
            }
          }
        }
      ],
      unsubscribe: null,
      moveVisible: false,
      touchStartX: 0,
      touchStartY: 0,
      mobileEditorVisible: false,
    }
  },
  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setShowCodeLineNumbers' ||
          mutation.type === 'setTabWidth') {
        this.key++
      }
    })

    if (this.isMobile) {
      this.$refs.viewer.parentElement.addEventListener('touchstart', this.onTouchStart)
      this.$refs.viewer.parentElement.addEventListener('touchend', this.onTouchEnd);
    }
  },
  beforeUnmount() {
    if (this.isMobile) {
      this.$refs.viewer.parentElement.removeEventListener('touchstart', this.onTouchStart)
      this.$refs.viewer.parentElement.removeEventListener('touchend', this.onTouchEnd);
    }

    this.unsubscribe()
  },
  methods: {
    mdHeadingId(text, level, index) {
      return getHeaderId(text, level, index)
    },
    moveClosed() {
      this.moveVisible = false
    },
    onTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX
      this.touchStartY = e.changedTouches[0].screenY
    },
    onTouchEnd(e) {
      var touchEndX = e.changedTouches[0].screenX;
      var touchEndY = e.changedTouches[0].screenY;
      var isVertical = Math.abs(this.touchStartY - touchEndY) > 150

      if (!isVertical && touchEndX - this.touchStartX > 100) {
        this.$emit('close-requested')
      }
    },
    onCancelSelected() {
      this.mobileEditorVisible = false
    },
    onSaveSelected(data) {
      if (this.selectedNode !== null) {
        this.selectedNode.label = data.title
        this.selectedNode.data = data.text
      }
      this.mobileEditorVisible = false
    }
  }
}
</script>

<style>
.small-dial {
  width: 3.4rem !important;
  height: 3.4rem !important;
}

.document-title-parent-padded {
  padding-left: 1.24rem !important;
  padding-right: 1.6rem !important;
}
</style>
