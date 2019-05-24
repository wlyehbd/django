<template>
  <div class="indexContainer">
    <div class="menu">
      <div class="logo"></div>
      <!-- :default-active 当前激活菜单的 index -->
      <!-- :default-openeds 当前打开的 sub-menu 的 index 的数组 -->
      <el-menu class="el-menu-vertical-demo" unique-opened menu-trigger="click" :default-active="active" :default-openeds="openList" :collapse-transition="false" @open="handleOpen" @select="handleSelect">
        <el-menu-item index="/" >
          <i class="icon indexicon"></i>
          <span slot="title" :class="selectMenu == '/'? 'active' : ''">首页</span>
          <div class="sideline" :class="selectMenu == '/' ? '' : 'none'"></div>
        </el-menu-item>
        <el-submenu index="2" >
          <template slot="title">
                <i class="icon buildingicon"></i>
                <span :class="selectMenu == '2' ?  'active' : ''">二级导航</span>
                <div class="sideline" :class="selectMenu == '2' ? '' : 'none'"></div>
           </template>
         <el-menu-item-group>
            <el-menu-item index="/housesManage/index">二级导航</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" >
            <template slot="title">
              <i class="icon cityicon"></i>
              <span :class="selectMenu == '3' ? 'active' : ''">数据导出</span>
              <div class="sideline" :class="selectMenu == '3' ? '' : 'none'"></div>
            </template>
          <el-menu-item-group>
            <el-menu-item index="/cityControl/index">数据导出</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
              <i class="icon limiticon"></i>
              <span :class="selectMenu == '4' ? 'active' : ''">流媒体播放</span>
              <div class="sideline" :class="selectMenu == '4' ? '' : 'none'"></div>
            </template>
          <el-menu-item-group>
            <el-menu-item index="/limitManage/index">流媒体播放</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
            <template slot="title">
              <i class="icon limiticon"></i>
              <span :class="selectMenu == '5' ? 'active' : ''">图片上传</span>
              <div class="sideline" :class="selectMenu == '5' ? '' : 'none'"></div>
            </template>
          <el-menu-item-group>
            <el-menu-item index="/limitManage/index">图片上传</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main">
      <div class="main-nav" style="position:relative">
        <el-tabs v-model="tabSel" type="card" closable @tab-remove="removeTab">
          <el-tab-pane class="indextab" :name="'/'">
            <span slot="label" class="index-tab" :key="'/'" :name="'/'"><i></i></span>
            <component :is="homeIndex" ></component>
          </el-tab-pane>
          <el-tab-pane
            v-for="(item) in tabList"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          > 
          <div style="min-width:1000px;overflow-x:auto;">
            <component :is="item.content" @activeTabsel="activeTabsel"  @add="addTab" @close="closeChoose" :query="item.childQuery"></component>
          </div>  
          </el-tab-pane>
        </el-tabs>
        <div class="close" style="position:absolute;right: 0;top: 0">
          <el-dropdown trigger="click" @command="closeChoose">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu class="xiala" slot="dropdown">
              <el-dropdown-item command="now">关闭当前标签页</el-dropdown-item>
              <el-dropdown-item command="other">关闭其他标签页</el-dropdown-item>
              <el-dropdown-item command="all">关闭全部标签页</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // default-openeds,控制展开的菜单
        openList: ['/'],
        // default-active,控制当前选择的菜单
        active: '/',
        // 控制菜单栏下级选中上级也是选中状态
        selectMenu: '/',
        // 菜单列表
        menu: [{
            title: '首页',
            name: '/',
            content: 'home-index'
          },
          {
            title: '二级导航',
            name: '/housesManage/index',
            content: 'house-manage-index'
          },
          {
            title: '数据导出',
            name: '/cityControl/index',
            content: 'city-control-index'
          },
          {
            title: '流媒体播放',
            name: '/limitManage/index',
            content: 'limit-manage-index'
          },
          {
            title: '图片上传',
            name: '/sensitiveWord/index',
            content: 'sensitive-word-index'
          }
        ],
        tabList: [],
        tabSel: '/',
        // 打开标签页的组件名
        homeIndex: 'home-index',
      }
    },
    created() {
   
    },
    methods: {
      handleOpen(key, keyPath) { // 控制菜单展开(有子菜单的菜单选项)
        // 控制选择其他,当前展开收起
        this.menuDeal(key, keyPath[0]);
      },
      // 控制菜单内容选择(没有子菜单的菜单选项)
      handleSelect(key, keyPath) {
        if (key == '/') {
          this.tabSel = '/'
        }
        // 控制选择其他,当前展开收起
        this.menuDeal(key, keyPath[0]);
        this.judgeTab(key);
      },
      // 主体标签页
      // 用户按钮
      activeTabsel(val){
        this.tabSel=val
      },
  
      // 关闭标签
      removeTab(targetName) {
        let tabs = this.tabList;
        let activeName = this.tabSel;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.tabSel = activeName;
        this.tabList = tabs.filter(tab => tab.name !== targetName);
        if (this.tabList.length == 0) {
          this.tabSel = '/'
        }
      },
      // 添加标签
      addTab(add) {
        if (add.name == '/') {
          return
        }
        for (let i in this.tabList) {
          if (this.tabList[i].name == add.name) {
            this.tabSel = add.name
            return
          }
        }
        this.tabList.push(add);
        this.tabSel = add.name;
      },
      // 选择关闭
      closeChoose(command) {
        switch (command) {
          case 'now':
            if (this.tabSel == '/') {
              return;
            }
            let temp
            for (let i in this.tabList) {
              if (this.tabList[i].name == this.tabSel) {
                this.tabList.splice(i, 1);
                temp = i;
              }
            }
            if (this.tabList[temp]) {
              this.tabSel = this.tabList[temp].name;
            } else {
              if (this.tabList.length == 0) {
                this.tabSel = '/';
              } else {
                this.tabSel = this.tabList[temp - 1].name;
              }
            }
            break;
          case 'other':
            if (this.tabSel == '/') {
              return;
            }
            for (let i in this.tabList) {
              if (this.tabList[i].name == this.tabSel) {
                let temp = this.tabList[i];
                this.tabList.splice(0);
                this.tabList.push(temp);
              }
            }
            break;
          case 'all':
            this.tabSel = '/';
            this.tabList.splice(0);
            break;
        }
      },
      // == 数据处理方法
      // 对添加标签页的处理
      judgeTab(key) {
        for (let i in this.menu) {
          // 找到当前添加标签页的对象
          if (this.menu[i].name == key) {
            let count = 0;
            // 根据tabList包含内容,判断对当前点击的标签的处理方法 -- 添加 / 将当前标签页变为点击的页面
            if (this.tabList.length == 0) {
              this.addTab(this.menu[i]);
            } else {
              for (let j in this.tabList) {
                let count = 0;
                if (this.tabList[j].name == key) {
                  this.tabSel = this.tabList[j].name;
                  return;
                } else {
                  if (j == this.tabList.length - 1 && count == 0) {
                    this.addTab(this.menu[i]);
                  }
                }
              }
            }
          }
        }
      },
      // 处理以及目录选择及展开
      menuDeal(key, firstKey) {
        this.active = key;
        this.selectMenu = firstKey;
        this.openList.splice(0);
        this.openList.push(firstKey);
      },
    },
    watch: {
      'tabSel': function(val) {
        if (this.tabSel.indexOf('housesManage') != '-1') {
          this.menuDeal('/housesManage/index', '2');
        } else if (this.tabSel.indexOf('cityControl') != '-1') {
          this.menuDeal('/cityControl/index', '3');
        } else if (this.tabSel.indexOf('limitManage') != '-1') {
          this.menuDeal('/limitManage/index', '4');
        }else if (this.tabSel.indexOf('sensitiveWord') != '-1'){
          this.menuDeal('/sensitiveWord/index','5');
        }else {
          this.menuDeal('/', '/');
          return;
        }
      }
    }
  };
</script>

<style scoped>
  .el-icon--left {
    position: relative;
    z-index: 1000;
    margin-left: -40px;
    margin-top: -40px;
    font-size:14px;
  }
  .el-dropdown {
    cursor: pointer;
  }
  /* 左侧菜单栏 */
  .menu {
    position: fixed;
    left: 0;
    top: 0;
    width: 256px;
    height: 100vh;
    background: #fff;
    float: left;
    border-right: 1px solid #eee;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .menu .logo {
    width: 115px;
    height: 30px;
    background-image: url('../assets/image/logo.png');
    background-position: 0% 0%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 53px 36px 0;
  }
  .menu .nav {
    margin-top: 50px;
  }
  .el-menu {
    margin-top: 44px;
    border-right: none;
  }
  .el-menu .el-menu-item {
    position: relative;
    height: 54px;
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: transparent;
  }
  .el-menu .el-menu-item i.icon,
  .el-submenu i.icon {
    margin-right: 12px;
    line-height: 54px;
    padding: 7px;
  }
  .indexicon {
    background: url(../assets/image/index.png) center center no-repeat;
  }
  .buildingicon {
    background: url(../assets/image/building.png) center center no-repeat;
  }
  .cityicon {
    background: url(../assets/image/city.png) center center no-repeat;
  }
  .limiticon {
    background: url(../assets/image/limit.png) center center no-repeat;
  }
  .directicon{
    background: url(../assets/image/direct.png) center center no-repeat;
    background-size: 90% 50%;
  }
  .el-submenu .el-menu .el-menu-item-group {
    padding: 8px 0;
    background: #f8f8f8;
  }
  .el-submenu .el-menu .el-menu-item-group .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding-left: 54px!important;
  }
  .el-submenu .el-menu .el-menu-item-group .el-menu-item.is-active {
    background: #ff8400;
    color: #fff;
  }
  .el-menu .sideline {
    position: absolute;
    left: 0;
    top: 16px;
    width: 2px;
    height: 22px;
    background: #ff8400;
  }
  .active {
    color: #ff8400;
  }
  /* 右侧主体 */
  /* 右侧主体顶部 */
  .main {
    width: calc(100% - 196px);
    float: left;
    min-height: 100vh;
    position: fixed;
    left: 197px;
    top: 0;
  }
  .main .main-top {
    width: 100%;
    height: 48px;
    background: #fff;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    padding: 4px 34px 0 34px;
    box-sizing: border-box;
  }
  .main .main-top .position {
    float: left;
    position: relative;
  }
  .main .main-top .position .el-select {
    width: 105px;
  }
  .main .main-top .position .el-select .el-input__inner {
    padding-left: 30px;
  }
  .positionicon {
    position: absolute;
    left: 0;
    top: 10px;
    width: 20px;
    height: 20px;
    background: url(../assets/image/position.png) no-repeat;
  }
  .main .main-top .user {
    float: right;
  }
  .main .main-top .user .el-dropdown {
    margin-top: 12px;
  }
  .main .main-top .user .el-dropdown .el-input__inner {
    padding-left: 40px;
  }
  .usericon {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    overflow: hidden;
    float: left;
    margin-right: 8px;
    margin-top: 4px;
    background: url(../assets/image/head.png) no-repeat;
  }
  /* 右侧主体导航 */
  .main>.main-nav {
    width: 100%;
    height: 40px;
    background: #fff;
  }
  .main>.main-nav>.el-tabs {
    float: left;
    width: 100%;
  }
  .main>.main-nav>.el-tabs .index-tab {
    width: 48px;
    height: 48px;
  }
  .main>.main-nav>.el-tabs .index-tab i {
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 48px;
    vertical-align: middle;
    background: url(../assets/image/indexicon.png);
  }
  .main>.main-nav .close {
    width: 48px;
    height: 100%;
    border-left: 1px solid #eee;
  }
  .main>.main-nav .el-dropdown {
    width: 48px;
    height: 40px;
  }
  .main>.main-nav .el-dropdown .el-dropdown-link {
    width: 48px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
  }
  .main>.main-nav .el-dropdown .el-dropdown-link i {
    margin-left: 0;
  }
</style>
<style>
 .main-top .position .el-input--suffix .el-input__inner {
    text-align: center;
  }
  .back_ground_img1[data-v-44edb68e] {
    border: 1px solid #eee;
  }
  .back_ground_img2[data-v-44edb68e] {
    border: 1px solid #eee;
  }
  .static_div[data-v-44edb68e] {
    border: 1px solid #eee;
  }
  .columnar[data-v-44edb68e] {
    border: 1px solid #eee;
  }
  .pie_con[data-v-44edb68e] {
    border: 1px solid #eee;
  }
  .main .main-top .position .el-input {
    width: 127px;
  }
  .xiala{
    top:80px !important;
  }
</style>
