<template>
  <div>
    <transition name="slide-right">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Index extends Vue {}
</script>

<style lang="stylus" scoped></style>
