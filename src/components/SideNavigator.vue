<template>
  <div>
    <div class="logo-container">
      <div class="logo">Storage</div>
    </div>
    <div class="navi">
      <div class="menu">
        <el-menu :default-active="defaultActive" router background-color="#393e4e" text-color="#c4c5ca">
          <el-menu-item index="/cargo-item"><i class="el-icon-menu"></i>CargoItem</el-menu-item>
          <el-menu-item index="/cargo-suite"><i class="el-icon-menu"></i>CargoSuite</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: this.$route.path,
      loading: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.logo-container {
  height: 100px;
  background-color: #292f3e;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    font-size: 30px;
    font-weight: bold;
    color: white;
  }
}
.logout-container {
  position: absolute;
  left: 50%;
  margin-left: -35px;
  bottom: 30px;
}
.navi {
  position: relative;
  background-color: #393e4e;
  height: calc(100vh - 100px);
  overflow-y: scroll;
}
</style>
<style lang="scss">
.menu .el-menu {
  border-right: 0px;
  .el-menu-item {
    padding-left: 40px !important;
    font-size: 16px;
  }
}
</style>
