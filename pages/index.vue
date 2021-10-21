<template>
  <div>
    <Tutorial />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPref: null,
    }
  },
  computed: {
    component() {
      return 'Population'
    },
    items() {
      return this.selectedPref
    },
  },
  watch: {
    selectedPref() {
    },
  },
}
</script>
