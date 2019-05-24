import Vue from 'vue'
import App from './App'
import router from './router/index'
import axios from './httpjs.js'
import store from '@/store/index.js'
import BaiduMap from 'vue-baidu-map' // 百度地图
import echarts from 'echarts'//echart图标

// elementUI相关引用
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//引入主题色
import './theme/index.css'

import './assets/css/base.css'

import view from './view.js'

//echart图标
Vue.prototype.$echarts = echarts 

//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  error:require('@/assets/image/error.jpg'),
  loading:require('@/assets/image/loading.gif')
})

//流媒体播放
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.config.productionTip = false
Vue.use(ElementUI)

// 百度地图
Vue.use(BaiduMap, {
  ak: '5ulnp3fPzXQaP38hsxAVxc83cqd5i2jp'
})

//注册组件
for (let i in view) {
  Vue.component(i, view[i])
}

//$代表服务请求
Vue.prototype.$http = axios;


/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  mounted() { },
})

