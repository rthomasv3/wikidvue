<template>
  <div class="mt-2">
    <div class="grid">
      <div class="col-10">
        <p>Theme</p>
      </div>
      <div class="col-2">
        <Button class="mt-1" :icon="themeIcon" @click="toggleTheme" text />
      </div>
    </div>

    <Divider class="mt-0 mb-2" />

    <div class="grid">
      <div class="col-10">
        <p>Theme again to test divider and layout</p>
      </div>
      <div class="col-2">
        <Button class="mt-1" :icon="themeIcon" @click="toggleTheme" text />
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
