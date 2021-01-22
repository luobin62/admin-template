<template>
  <div class="dashboard-container">
    <div class="dashboard-user">{{ username }}</div>
    <div class="dashboard-text">欢迎使用芯片管理平台</div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
export default {
  /* computed: {
    ...mapGetters([
      'name'
    ])
  }*/
  data() {
    return {
      username: '',
    }
  },
  mounted() {
    this.username = Cookies.get('user')
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-user {
    font-size: 32px;
    font-weight: bold;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    margin-left: 40px;
  }
}
</style>
