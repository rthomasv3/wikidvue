<template>
  <div>
    <Toast />

    <Toolbar class="surface-section">
      <template #start>
        <Button icon="pi pi-plus" class="mr-2" text outlined @click="addClicked" />
      </template>

      <template #end>
        <Button icon="pi pi-cog" text outlined @click="settingsVisible = !settingsVisible" />
      </template>
    </Toolbar>

    <Dialog v-model:visible="settingsVisible" modal header="Settings" :style="{ minWidth: '35vw' }" :dismissableMask="true">
      <Settings />
    </Dialog>
  </div>
</template>

<script>
import Settings from '@/components/Settings.vue'

export default {
  name: 'DocumentTreeToolbar',
  components: {
    Settings
  },
  data: function () {
    return {
      settingsVisible: false
    }
  },
  methods: {
    addClicked() {
      var page = { key: -1, label: 'Title', data: '' }
      this.$store.state.wikiDocuments.push(page)
      this.$store.state.wikiDocuments.sort((x,y) => { return x.label.localeCompare(y.label) })
      this.$emit('page-added', page)
    }
  }
}
</script>

<style scoped></style>
