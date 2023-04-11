import axios from "axios";

const service = axios.create({
    timeout: 5000,
})


// 请求拦截
service.interceptors.request.use((config) => {

    // 从本地拿到 token
    const token = localStorage.getItem("userToken")
    if(token){
        config.headers['Authorization'] = "Bearer " + token
    }

    // 做相应处理...
    return config
}, (err) => {
    // 发生错误时候的回调
    console.log("请求拦截出错", err)
})


// 响应拦截
service.interceptors.response.use((res) => {
    // 做相应处理...
    const response = res.data;
    return response
}, (err) => {
    // 发生错误时候的回调
    console.log("响应拦截出错", err)
})

export default service