import axios from 'axios'
import ElementUI from "element-ui";
import router from "@/router";

const request = axios.create({
  // baseURL: "https://api.apiopen.top/api",
  timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // 设置请求头
    config.headers['token'] = token;
  }
  return config
}, error => {
  return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  response => {
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === 'blob') {
      return res
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }
    if (res.code === 101 || res.code === 106 || res.code === 114 || res.code === 108) {
      alert(res.message);
       router.push("/");
      return Promise.reject(new Error(res.message));
    }
    //请求接口返回得只要不是200都提示用户
    if (res.code !== 200) {
      ElementUI.Message({message: res.message, type: "error"});
      return Promise.reject(new Error(res.message));
    }
    return res;
  },
  error => {
    // for debug
    console.log('err' + error)
    return Promise.reject(error)
  }
)


export default request

