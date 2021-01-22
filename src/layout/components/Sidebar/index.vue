<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in newRoute"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo, },
  computed: {
    ...mapGetters([
      'sidebar',
      'newRoute',
    ]),
    /* routes() {
      return this.$router.options.routes
    },*/
    activeMenu() {
      const route = this.$route
      const { meta, path, } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      // 设置是否展示左侧导航栏的最上面的图片
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      // 设置左侧导航栏el-menu的样式
      return variables
    },
    isCollapse() {
      // 判断是否折叠
      return !this.sidebar.opened
    },
  },
}
</script>
