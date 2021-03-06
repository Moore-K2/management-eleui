// axios的二次封装，封装成类。 作用：1.处理一些项目相关的配置。
import axios from "axios"
import config from "../config"

// 判断当前的开发环境？dev:pro --/api/
const baseUrl = process.env.NODE_ENV === 'develpment' ? config.baseUrl.dev : config.baseUrl.pro
console.log("process.env.NODE_ENV:", process.env.NODE_ENV, config.baseUrl.dev);
//定义HTTPrequest请求类
class HttpRequest {
    // 构造函数，传入new的baseUrl
    constructor(baseUrl) {
        this.baseUrl = baseUrl

    }

    // 定义axios的一些相关配置
    getInsideConfig() {
        this.config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }

    // 定义拦截器
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function(config) {
            //在发送请求前做些什么
            return config;
        }, function(error) {
            //对请求错误做些什么
            return Promise.reject(error);
        });
        //添加响应拦截器
        instance.interceptors.response.use(function(response) {
            //对响应数据做点什么
            return response;
        }, function(error) {
            //对响应错误做点什么 
            console.log("error", error)
            return Promise.reject(error);
        })
    }

    // 主要功能--方法
    request(options) {
        const instance = axios.create() // axios实例创建
            // options：拿到相关配置。解构,后面的参数会覆盖前面对象中的参数，前面有的会存在
        options = {...this.getInsideConfig(), ...options }
        this.interceptors(instance)
        return instance(options)
    }
}



export default new HttpRequest(baseUrl)