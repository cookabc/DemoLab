<template>
  <div id="app">
    <header class="header">Demo Lab Stock Asistant - alpha</header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
  background: #f8f8f8;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.content {
  padding: 50px;
}
.section {
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
</style>
<style scoped>
.header {
  background: red;
  padding: 20px;
  color: #ffffff;
  font-size: 30px;
  font-weight: bold;
}
</style>

