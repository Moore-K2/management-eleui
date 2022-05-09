import Mock from "mockjs"
import homeApi from './mockServerData/home'
import userApi from "./mockServerData/userInfo"


// Mock.mock( rurl?, rtype?, template|function( options ) )
// 根据数据模板生成模拟数据
//  Mock.mock(rurl, template),记录数据模板。当拦截到匹配 rurl的Ajax请求时，
// 将根据数据模板template生成模拟数据，并作为响应数据返回。
// 这儿的url是自己拟定的，data.js这个接口请求文档要与之相同
Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock('./userInfo/getUserData', userApi.getUserInfo)
    // console.log(typeof userApi.getUserInfo === "function")