<template>
  <transition name="el-zoom-in-center" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        input: ""
      };
    },
  };
</script>

<style>
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity 1s ease;
  }
  .component-fade-enter,
  .component-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */
  {
    opacity: 0;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .el-dialog__header{
    font-weight: bold;
    padding: 24px;
    border-bottom: 1px solid #eee;
  }
  .el-dialog__header .el-dialog__title{
    font-size: 16px;
    color:#333;
  }
  .el-dialog__header .el-dialog__headerbtn{
    top: 28px;
    right: 24px;
  }
  .el-dialog__body{
    padding: 24px;
    max-height: 530px;
    overflow-y: scroll;
  }
  .el-dialog__footer{
    padding: 16px 32px;
    border-top: 1px solid #eee;
  }
  .el-input__prefix,
  .el-input__suffix {
    left: initial;
    right: 0;
  }
</style>
