<template>
  <div class="flex flex-column w-full">
    <MdEditor :key="key" ref="editor" class="h-full" v-model="text" language="en-US" :theme="theme" 
              :previewTheme="markdownTheme" :codeTheme="codeTheme" :toolbars="toolbars" 
              :footers="footers" :preview="showPreview" autoFocus @onChange="updateWordCount"
              :showCodeRowNumber="showCodeLineNumbers" :tabWidth="tabWidth" autoDetectCode
              :mdHeadingId="mdHeadingId">
      <template #defFooters>
        <p class="text-color-secondary text-xs m-0 pl-2 pt-2">Word Count: {{ wordCount }}</p>
      </template>
    </MdEditor>
  </div>

  <SpeedDial class="mr-5 mb-4" :model="items" :radius="120" type="quarter-circle" buttonClass="small-dial" 
             direction="up-left" :style="{ right: 0, bottom: 0, zIndex: 10001 }" :transitionDelay="90" />
</template>

<script>
import { MdEditor } from 'md-editor-v3';
import removeMd from 'remove-markdown';
import 'md-editor-v3/lib/style.css';
import { getHeaderId } from "../services/headerService";

export default {
  name: 'DocumentEditor',
  props: {
    documentData: ''
  },
  components: {
    MdEditor
  },
  emits: ['save-selected', 'cancel-selected'],
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
    tabWidth() {
      return this.$store.state.tabWidth
    }
  },
  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      this.key++
    })

    this.updateWordCount()
  },
  unmounted() {
    this.unsubscribe()
  },
  data() {
    return {
      key: 0,
      text: this.documentData,
      pageFullScreen: false,
      fullScreen: false,
      showPreview: true,
      wordCount: 0,
      toolbars: [],
      footers: [ 0 ],
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-save',
          command: () => { this.$emit('save-selected', this.text) }
        },
        {
          label: 'Toggle Page Full Screen',
          icon: 'pi pi-window-maximize',
          command: this.togglePageFullScreen
        },
        {
          label: 'Toggle Preview',
          icon: 'pi pi-eye-slash',
          command: this.togglePreview
        },
        {
          label: 'Delete',
          icon: 'pi pi-times-circle',
          command: () => { this.$emit('cancel-selected') }
        }
      ],
      unsubscribe: null
    }
  },
  methods: {
    togglePageFullScreen() {
      this.pageFullScreen = !this.pageFullScreen
      this.$refs.editor.togglePageFullscreen(this.pageFullScreen)

      if (this.pageFullScreen) {
        this.items[1].icon = 'pi pi-window-minimize'
      }
      else {
        this.items[1].icon = 'pi pi-window-maximize'
      }
    },
    toggleFullScreen() {
      this.fullScreen = !this.fullScreen
      this.$refs.editor.toggleFullscreen(this.fullScreen)
    },
    togglePreview() {
      this.showPreview = !this.showPreview
      this.$refs.editor.togglePreview(this.showPreview)

      if (this.showPreview) {
        this.items[2].icon = 'pi pi-eye-slash'
      }
      else {
        this.items[2].icon = 'pi pi-eye'
      }
    },
    updateWordCount() {
      var strippedText = removeMd(this.text)
        .replace(/(<([^>]+)>)/ig, ' ')
        .match(/\S+/g)

      this.wordCount = strippedText !== null ? strippedText.length : 0
    },
    mdHeadingId(text, level, index) {
      return getHeaderId(text, level, index)
    }
  }
}
</script>

<style scoped>
</style>