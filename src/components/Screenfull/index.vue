<template>
  <div>
    <!--<svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />-->
    <img
      src="../../assets/fullScreen/fullScreen.png"
      alt=""
      style="width:30px;"
      @click="click"
      v-if="!isFullscreen"
    >
    <img
      src="../../assets/fullScreen/noFullScreen.png"
      alt=""
      style="width:30px;"
      @click="click"
      v-else
    >
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'ScreenFull',
  data() {
    return {
      isFullscreen: false,
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        console.log(screenfull)
        this.$message({
          message: 'you browser can not work',
          type: 'warning',
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    },
  },
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
