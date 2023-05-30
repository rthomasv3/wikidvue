<template>
  <div ref="editorParent" class="flex flex-column w-full h-full">
    <InputText class="m-2" type="text" v-model="title" placeholder="Title" />

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

  <Dialog v-if="isMobile" v-model:visible="mobilePreviewVisible" modal position="right" :closable="false">
    <template #header>
        <Button icon="pi pi-chevron-left" text rounded plain @click="mobilePreviewVisible = false"/>
        <div class="w-full ml-2">
          <p class="font-bold">{{ title }}</p>
        </div>
      </template>
      <DocumentPreview :selectedNode="previewNode" :isMobile="isMobile" 
                       @closeRequested="onPreviewCloseRequested"  />
  </Dialog>
</template>

<script>
import DocumentPreview from '@/components/DocumentPreview.vue'
import { MdEditor } from 'md-editor-v3'
import removeMd from 'remove-markdown'
import 'md-editor-v3/lib/style.css'
import { getHeaderId } from '../services/headerService'

export default {
  name: 'DocumentEditor',
  props: {
    selectedNode: null,
    isMobile: false
  },
  components: {
    DocumentPreview,
    MdEditor,
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
    },
    documentTitle: {
      get() {
        return this.selectedNode?.label ?? ''
      },
      set(label) {
        this.selectedNode.label = label
      }
    },
    documentData: {
      get() {
        return this.selectedNode?.data ?? ''
      },
      set(data) {
        this.selectedNode.data = data
      }
    },
    previewNode() {
      return { label: this.title, data: this.text }
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
      this.showPreview = false
      this.$refs.editor.togglePreview(this.showPreview)
    }

    this.title = this.documentTitle
    this.text = this.documentData

    this.updateWordCount()

    if (this.isMobile) {
      this.items[2].icon = 'pi pi-eye'
      this.$refs.editorParent.parentElement.addEventListener('touchstart', this.onTouchStart)
      this.$refs.editorParent.parentElement.addEventListener('touchend', this.onTouchEnd)
    }
  },
  beforeUnmount() {
    if (this.isMobile) {
      this.$refs.editorParent.parentElement.removeEventListener('touchstart', this.onTouchStart)
      this.$refs.editorParent.parentElement.removeEventListener('touchend', this.onTouchEnd)
    }

    this.unsubscribe()
  },
  data() {
    return {
      key: 0,
      title: '',
      text: '',
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
          command: () => {
            var title = (this.title ?? '').trim()
            if (title.length == 0) {
              title = 'Title'
            }
            this.$emit('save-selected', { title: title, text: this.text })
          }
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
      unsubscribe: null,
      mobilePreviewVisible: false,
      touchStartX: 0,
      touchStartY: 0,
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
      var previewVisible = false

      if (this.isMobile) {
        this.mobilePreviewVisible = !this.mobilePreviewVisible
        previewVisible = this.mobilePreviewVisible
      }
      else {
        this.showPreview = !this.showPreview
        this.$refs.editor.togglePreview(this.showPreview)
        previewVisible = this.showPreview
      }

      if (previewVisible) {
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
        this.$emit('cancel-selected')
      }
    },
    onPreviewCloseRequested() {
      this.togglePreview()
    }
  }
}
</script>

<style scoped>
</style>