<template>
  <div>
    <Toast />

    <SpeedDial class="mr-5 mb-4" :model="items" :radius="120" type="quarter-circle" buttonClass="small-dial"
               direction="up-left" :style="{ right: 0, bottom: 0 }" :transitionDelay="90" />

    <MdPreview :key="key" :modelValue="documentData" language="en-US" :theme="theme" :previewTheme="markdownTheme" 
               :codeTheme="codeTheme" :showCodeRowNumber="showCodeLineNumbers" :mdHeadingId="mdHeadingId" />
  </div>
</template>

<script>
import { MdPreview } from 'md-editor-v3';
import { getHeaderId } from "../services/headerService";

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
    },
    showCodeLineNumbers() {
      return this.$store.state.showCodeLineNumbers
    }
  },
  data: function () {
    return {
      key: 0,
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
      ],
      unsubscribe: null
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
