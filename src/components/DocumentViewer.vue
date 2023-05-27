<template>
  <div>
    <Toast />

    <SpeedDial class="mr-5 mb-4" :model="items" :radius="120" type="quarter-circle" buttonClass="small-dial"
               direction="up-left" :style="{ right: 0, bottom: 0 }" :transitionDelay="90" />

    <MdPreview :modelValue="documentData" language="en-US" :theme="theme" 
               :previewTheme="markdownTheme" :codeTheme="codeTheme" />
  </div>
</template>

<script>
import { MdPreview } from 'md-editor-v3';
import { marked } from "marked";

export default {
  name: 'DocumentViewer',
  props: {
    documentData: null
  },
  components: {
    MdPreview
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
    }
  },
  data: function () {
    return {
      documentHtml: null,
      items: [ 
        { 
          label: 'Edit', 
          icon: 'pi pi-pencil', 
          command: () => { this.$emit('editor-selected') } 
        },
        { 
          label: 'Move', 
          icon: 'pi pi-file-export',
          command: () => { this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Move Clicked', life: 3000 }) } 
        },
        { 
          label: 'Download', 
          icon: 'pi pi-download',
          command: () => { this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Download Clicked', life: 3000 }) } 
        },
        { 
          label: 'Delete', 
          icon: 'pi pi-trash',
          command: () => { this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Delete Clicked', life: 3000 }) } 
        }
      ]
    }
  },
  mounted() {
    this.renderDocument()
  },
  updated() {
    this.renderDocument()
  },
  methods: {
    renderDocument() {
      if (this.documentData !== null && this.documentData !== undefined) {
        this.documentHtml = marked(this.documentData, { mangle: false, headerIds: false })
      }
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
