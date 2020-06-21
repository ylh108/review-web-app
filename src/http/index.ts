import axios from 'axios'
import { DEVELOPMENT, PRODUCTION } from '@/config/index.ts'

// if (process.env.NODE_ENV == 'development') {  // 开发环境
//     axios.defaults.baseURL = DEVELOPMENT
// } else if (process.env.NODE_ENV == 'production') {  // 生产环境
//     axios.defaults.baseURL = PRODUCTION
// }

const defaultOpt = {
    timeout: 60000,
    method: 'post',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'app': 'review-web-app'
    }
}
// 请求拦截器
async function request(config: any, headers = {}) {
    const token = localStorage.getItem('accessToken')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.accessToken = token
    }
    const _config = Object.assign({}, defaultOpt, config, headers)
    return axios(_config)
}

// 响应拦截器
axios.interceptors.response.use(
    (response: any) => {
        return response
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

export default request
