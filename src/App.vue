<template>
  <div>
    <SplitLayout :isSmall="this.windowWidth < 768" />
  </div>
</template>

<script>
import FixedLayout from '@/views/FixedLayout.vue'
import SplitLayout from '@/views/SplitLayout.vue'

export default {
  name: 'App',
  components: {
    FixedLayout,
    SplitLayout
  },
  data: function () {
    return {
      windowWidth: 0
    }
  },
  mounted() {
    this.setWindowWidth()
    window.addEventListener("resize", this.resizeEventHandler)
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeEventHandler)
  },
  methods: {
    resizeEventHandler(e) {
      this.setWindowWidth()
    },
    setWindowWidth() {
      this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
  overflow: hidden;
  background-color: var(--surface-section);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.full-height {
  height: 100%;
  height: 100vh;
  max-height: 100;
  max-height: 100vh;
}

.p-dialog-header {
  padding: 1rem 1rem 0rem 1rem !important;
}

.p-button:enabled {
  box-shadow: none !important;
}

.p-dialog-header-icon:enabled {
  box-shadow: none !important;
}

.p-tree-toggler:focus {
  box-shadow: none !important;
}

/* .p-treenode-content {
  box-shadow: none !important;
} */

.overflow-hidden {
  overflow: hidden;
}

.borderless {
  border: none !important;
}

.p-speeddial {
  z-index: 1000;
}

.p-speeddial-action {
  text-decoration: none;
  color: var(--text-color);
  background-color: var(--surface-border);
}

.p-speeddial-action:hover {
  background-color: var(--surface-100);
  color: var(--text-color);
}

.p-toast {
  width: 22rem !important;
}

@media (max-width: 767px) {
  .p-dialog {
    height: 100vh !important;
    height: 100% !important;
    left: 0 !important;
    max-height: 100% !important;
    top: 0 !important;
    transform: none;
    transition: none;
    width: 100vw !important;
    margin: 0 !important;
  }

  .p-dialog-content {
    flex-grow: 1;
  }
}

.scrollable {
  overflow-y: auto;
  width: 100%;
}

.p-tree-wrapper::-webkit-scrollbar,
.scrollable::-webkit-scrollbar {
  width: 7px;
}

.p-tree-wrapper::-webkit-scrollbar-track,
.scrollable::-webkit-scrollbar-track {
  background-color: transparent;
}

.p-tree-wrapper::-webkit-scrollbar-thumb,
.scrollable::-webkit-scrollbar-thumb {
  background-color: var(--surface-d);
  opacity: 1;
  transition: background-color 0.3s;
  border-radius: 9px;
}

.md-editor {
  background-color: var(--surface-section);
  border: none;
}

.cm-editor {
  background-color: var(--surface-section);
}

.md-editor-footer {
  height: 1.9rem;
  border: none;
}
</style>
