import axios from 'axios'
import { baseUrl } from './baseUrl.js'
import { Notification } from 'element-ui'

axios.interceptors.response.use((res) => {
  

}, (error) => {
  Notification.error({
    title: '接口错误',
    message: "正在修复中..."
  })
  return Promise.reject(error)
})

axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 10000;
axios.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
export default axios;
