import axios from "./axios";

// 这个文档是写所有接口请求的
export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData', // 拦截器Mock里面的url
        method: 'get', //默认就是Get请求
    })
}

// get是从服务器上获取数据，post是向服务器传送数据。
export const getUserData = () => {
    return axios.request({
        url: './userInfo/getUserData',
        method: "get"
    })
}

//借助二次封装的axios进行接口请求的编写

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}