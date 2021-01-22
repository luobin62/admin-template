<template>
  <!--导航栏内容-->
  <div class="navbar">
    <!--变更测菜单栏的宽度按钮-->
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <!--面包屑展示路径按钮-->
    <breadcrumb class="breadcrumb-container" />
    <!--导航栏右侧内容-->
    <div class="right-menu">
      <template>
        <Screenfull id="screenfull" class="right-menu-item hover-effect" style="padding:10px;" />
      </template>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <!--<a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>-->
          <el-dropdown-item @click.native="changPassword">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Dialog :dialog-form-visible="visible" @closeDialog="closeDialog" @submitData="passwordSubmit" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Dialog from '@/layout/components/Dialog'
import Screenfull from '@/components/Screenfull'
import { resetPassword } from '@/api/sys/user'
import md5 from 'md5'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Dialog,
    Screenfull,
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
    ]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout').then(() => {
        this.$message.success('退出登录成功')
        // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        // this.$router.push(`/login`)
        this.$router.push({ path: '/login', })
      })
    },
    changPassword() {
      this.visible = true
    },
    closeDialog() {
      this.visible = false
    },
    passwordSubmit(parmas) {
      console.log(parmas)
      resetPassword({ oldPassword: md5(parmas.oldPassword), newPassword: md5(parmas.newPassword), confirmPassword: md5(parmas.confirmPassword), }).then(res => {
        if (res.code === 200) {
          this.$message.success('修改密码成功,请重新登录')
          this.visible = false
          setTimeout(() => {
            console.log(111)
            this.logout()
          }, 1500)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
