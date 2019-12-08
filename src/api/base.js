import axios from 'axios'
import { Message } from 'element-ui'
import { removeEmptyValue } from '../utils'
import { removeToken } from '../utils/auth'

axios.interceptors.request.use(config => { // 请求前拦截
  // config.headers.debug = '1' // 全局添加headers
  config.headers.requestType = 'resident'
  return config
}, err => {
  Message.error({ message: '请求超时!' })
  return Promise.resolve(err)
})
axios.interceptors.response.use(data => { // 请求结果返回拦截
  if (data.data.code !== 200 && data.data.code !== 0) {
    Message.error({ message: data.data.message })
    if (data.data.code === 405) {
      // 权限不足需要登录
      removeToken()
      window.location.href = `http://${window.location.host}/login?reference=${window.location.href}`
    }
    return data
  }
  return data
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({ message: '服务器被吃了⊙﹏⊙∥' })
  } else if (err.response.status === 405) {
    Message.error({ message: '权限不足,请联系管理员!' })
  } else if (err.response.status === 400) {
    // 校验是否存在CURRENT_PROJECT
    if (localStorage.getItem('CURRENT_PROJECT')) {
      window.location.href = `http://${window.location.host}/home?reference=${window.location.href}`
    }
  } else {
    Message.error({ message: '未知错误!' })
  }
  return Promise.resolve(err)
})
var base = '' // 基础路径
// switch (process.env.NODE_ENV) { // 根据当前环境设置不同的请求链接地址
//   case 'development':
//     base = ''
//     break
//   case 'production':
//     base = ''
//     break
//   default:
//     //
// }
export const get = (url, params) => {
  params = removeEmptyValue(params)
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params,
    headers: {}
  })
}
export const post = (url, params) => {
  params = removeEmptyValue(params)
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}
export const postImg = (url, params) => {
  params = removeEmptyValue(params)
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
      'api_key': 'access_token',
      'X-Requested-With': 'XMLHttpRequest',
      'debug': '1',
      'Accept': '*/*'
    }
  })
}
export const upload = (url, params) => {
  params = removeEmptyValue(params)
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const put = (url, params) => {
  params = removeEmptyValue(params)
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function(data) {
      let ret = ''
      for (var it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
export const del = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  })
}
