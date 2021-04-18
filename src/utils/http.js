import axios from 'axios'
 const ENV = process.env.NODE_ENV;
 console.log('当前环境', ENV)
let BASE_URL = ''
if (ENV == 'development') {
    BASE_URL = 'http://localhost:9080/zlink' // 开发环境
} else {
	  BASE_URL = 'http://lsdj.2009xc.com:8090/zlink' // 生产环境
}
const service = axios.create({
  baseURL: BASE_URL, // 接口域名的地址
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  withCredentials:true
})

export default function request (url, data = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method
    }
    if (method.toLowerCase() === 'get') {
      options.params = data
    } else {
      options.data = data
    }
    service(options)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
        console.error(error)
      })
  })
}
