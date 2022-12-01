import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import { MessageBox } from 'element-ui'

// axios.defaults.headers.post['Content-type']='application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Access-Control-Allow-Origin']='http://localhost:8080/'
//axios.defaults.withCredentials = true

const service = axios.create({
    baseURL:'/city',
    timeout: 180000,
    async:true,
    crossDomain:true,
    withCredentials: true,
    headers:{
        "app_id":"s030nllezpgsnstr",
        "app_secret":"Vi9MTFUzbjNZWE9Md3FReWVqYXZpQT09"
      }
});

// 请求拦截器配置
// service.interceptors.request.use(config => {
//   if (store.getters.userInfo) {
//     config.headers['token'] = '6e996d0aa210482c8599b087daccb0e0'
    // config.headers['token'] = store.getters.userInfo.token
//   }
//   return config
// }, error => {
//   Promise.reject(error)
// })

// 响应拦截器
// service.interceptors.response.use(
//   response => {
//     if (response.data.code === 0) {
//       return response
//     }
    // else if (response.data.code === 33) {
    //   return response
    // }
    // else {
    //   if (response.data.code === 20) {
    //     MessageBox.confirm(response.data.message, '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       localStorage.clear()
    //       sessionStorage.removeItem('userInfo')
    //       location.reload()
    //       return Promise.reject(response.data.message)

    //       // localStorage.clear()
    //       // sessionStorage.removeItem('userInfo')
    //       // router.push('/login')
    //       // location.reload()
    //     }).catch(() => {

    //     })
    //   } else {
    //     Message({
    //       showClose: true,
    //       message: response.data.message,
    //       type: 'error',
    //       duration: 2000
    //     })

    //   }
  //   }
  // },
  // error => {
  //   if (error.response) {
  //     Message({
  //       showClose: true,
  //       message: error.response.status,
  //       type: 'error',
  //       duration: 2000
  //     })
  //   } else {
  //     Message({
  //       showClose: true,
  //       message: error,
  //       type: 'error',
  //       duration: 2000
  //     })
  //   }
  //   return Promise.reject(error)
  // }
// )

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
      const res = response.data
      console.log('真实的回复为：',response)
      // if the custom code is not 200, it is judged as an error.
      if (response.status != 200) {
          //判断token是否失效
          if(response.status==400){
              Message({
                  message: '您尚未登录，请先登录',
                  type: 'error',
                  duration: 5 * 1000
              })
              return Promise.reject(new Error('您尚未登录'||'Error'))
          }
          console.log(response.status)
          return Promise.reject(new Error(res.msg || 'Error'))
      }
      else {
          return res
      }
  },
  error => {
      console.log('Request Error!') // for debug
      return Promise.reject(error)
  }

)
// request interceptor
service.interceptors.request.use(
  config=>{
      return config;
  },
  error =>{
      console.log(error);
      return Promise.reject(error);
  }

)
export default service
