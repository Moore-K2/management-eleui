import axios from "./axios";

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