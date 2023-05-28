<template>
  <div>
    <Toast />

    <SpeedDial v-if="selectedNode" class="mr-5 mb-4" :model="items" :radius="120" type="quarter-circle" buttonClass="small-dial"
               direction="up-left" :style="{ right: 0, bottom: 0 }" :transitionDelay="90" />

    <MdPreview :key="key" :modelValue="documentData" language="en-US" :theme="theme" :previewTheme="markdownTheme" 
               :codeTheme="codeTheme" :showCodeRowNumber="showCodeLineNumbers" :mdHeadingId="mdHeadingId" />

    <Dialog v-model:visible="moveVisible" modal header="Move Document" :style="{ minWidth: '35vw' }" :dismissableMask="true">
      <Move :selectedNode="selectedNode" @onClosed="moveClosed" />
    </Dialog>

    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script>
import { MdPreview } from 'md-editor-v3';
import { getHeaderId } from "../services/headerService";
import { exportDocument} from '../services/exportService';
import Move from '@/components/Move.vue'

export default {
  name: 'DocumentViewer',
  props: {
    documentData: null,
    selectedNode: null
  },
  components: {
    MdPreview,
    Move
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
    }
  },
  data: function () {
    return {
      key: 0,
      items: [ 
        { 
          label: 'Edit', 
          icon: 'pi pi-pencil', 
          command: () => { this.$emit('editor-selected') } 
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
                }
              });
            }
          }
        }
      ],
      unsubscribe: null,
      moveVisible: false
    }
  },
  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setShowCodeLineNumbers' ||
          mutation.type === 'setTabWidth') {
        this.key++
      }
    })
  },
  unmounted() {
    this.unsubscribe()
  },
  methods: {
    mdHeadingId(text, level, index) {
      return getHeaderId(text, level, index)
    },
    moveClosed() {
      this.moveVisible = false
    }
  }
}
</script>

<style>
.small-dial {
  width: 3.4rem !important;
  height: 3.4rem !important;
}
</style>
