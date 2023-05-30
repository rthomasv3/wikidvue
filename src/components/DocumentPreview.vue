<template>
  <div ref="viewer" class="flex flex-column flex-grow-1 h-full">
    <MdPreview :key="key" :modelValue="documentData" language="en-US" :theme="theme" 
               :previewTheme="markdownTheme" :codeTheme="codeTheme" :showCodeRowNumber="showCodeLineNumbers" 
               :mdHeadingId="mdHeadingId" />
  </div>
</template>

<script>
import { MdPreview } from 'md-editor-v3';
import { getHeaderId } from "../services/headerService";

export default {
  name: 'DocumentViewer',
  props: {
    selectedNode: null,
    isMobile: false,
  },
  components: {
    MdPreview,
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
      unsubscribe: null,
      touchStartX: 0,
      touchStartY: 0,
    }
  },
  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setShowCodeLineNumbers') {
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
    }
  }
}
</script>

<style>
</style>
