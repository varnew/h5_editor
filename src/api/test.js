import { post } from './base.js'

const baseUrl = ''

/**
 * @desc: web接口预调试地址
 */
const sysConfigDetail = function(params) {
  return post(`${baseUrl}/sysConfig/detail?id=1200325066929729538`, params)
}

const testAPI = {
  sysConfigDetail
}
export default testAPI
