import Mock from "mockjs"
import homeApi from './mockServerData/home'
import mallApi from "./mockServerData/userInfo"
import userApi from "./mockServerData/user"
import permissionApi from './mockServerData/permission'


// Mock.mock( rurl?, rtype?, template|function( options ) )
// 根据数据模板生成模拟数据
//  Mock.mock(rurl, template),记录数据模板。当拦截到匹配 rurl的Ajax请求时，
// 将根据数据模板template生成模拟数据，并作为响应数据返回。
// 这儿的url是自己拟定的，data.js这个接口请求文档要与之相同
Mock.mock('/home/getData', 'get', homeApi.getStatisticalData)
Mock.mock('./userInfo/getUserData', 'get', mallApi.getUserInfo)

// 对mockServerDara中的user数据进行拦截
// 用Mock.mock的第二种方式，Mock.mock（正则匹配，方法，回调函数）
// Mock.mock('user/add', 'post', userApi.createUser)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)

// 拦截mock生成的用户数据列表.url要与data.js接口中的url保持一致
Mock.mock("/user/del", 'post', userApi.deleteUser)
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)

// 下面的会报错
// Mock.mock('/user/getUser', 'get', userApi.getUserList)

// 拦截permission的数据
// Mock.mock('/permission/getMenu', 'post', permissionApi.getMenu)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)