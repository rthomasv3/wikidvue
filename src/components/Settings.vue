<template>
  <div class="mt-2">
    <div class="grid align-items-center">
      <div class="col-fixed">
        <p>Theme</p>
      </div>
      <div class="col flex justify-content-end">
        <Button :icon="themeIcon" @click="toggleTheme" text />
      </div>
    </div>

    <Divider class="mt-0 mb-2" />

    <div class="grid align-items-center">
      <div class="col-fixed">
        <p>Markdown Theme</p>
      </div>
      <div class="col flex justify-content-end">
        <Dropdown v-model="selectedMarkdownTheme" :options="markdownThemes" placeholder="Select a theme..." />
      </div>
    </div>

    <Divider class="mt-0 mb-2" />

    <div class="grid align-items-center">
      <div class="col-fixed">
        <p>Code Theme</p>
      </div>
      <div class="col flex justify-content-end">
        <Dropdown v-model="selectedCodeTheme" :options="codeThemes" placeholder="Select a theme..." />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Settings',
  computed: {
    themeIcon() {
      return this.$store.state.currentTheme === this.$store.state.darkTheme ? 'pi pi-sun' : 'pi pi-moon'
    },
    markdownThemes() {
      return this.$store.state.markdownThemes
    },
    selectedMarkdownTheme: {
      get() {
        return this.$store.state.selectedMarkdownTheme
      },
      set(selectedTheme) {
        this.$store.commit('setMarkdownTheme', selectedTheme)
      }
    },
    codeThemes() {
      return this.$store.state.codeThemes
    },
    selectedCodeTheme: {
      get() {
        return this.$store.state.selectedCodeTheme
      },
      set(selectedTheme) {
        this.$store.commit('setCodeTheme', selectedTheme)
      }
    }
  },
  methods: {
    toggleTheme() {
      var currentTheme = this.$store.state.currentTheme
      this.$store.commit('toggleTheme')
      var newTheme = this.$store.state.currentTheme
      this.$primevue.changeTheme(currentTheme, newTheme, 'theme-link', () => { });
    }
  }
}
</script>

<style scoped></style>
