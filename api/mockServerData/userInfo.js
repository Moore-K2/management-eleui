import Mock from 'mockjs'

// userinfomation 数据
let userinfo = []

const getUserInfo = function() {
    // userinfo = (Mock.mock({
    //     "list|20-25": [{
    //         // id: '@increment()',
    //         idCard: '@id()',
    //         name: '@cname()',
    //         address: '@city(true)', // 加true显示省级+市级
    //         birthOfDate: '@date(yyyy-MM-dd)'

    //     }]
    // }))
    for (let i = 0; i < 25; i++) {
        userinfo.push(Mock.mock({
            idCard: '@id()',
            name: '@cname()',
            address: '@city(true)', // 加true显示省级+市级
            birthOfDate: '@date(yyyy-MM-dd)'
        }))
    }
    return {
        code: 20001,
        userdata: { userinfo }
    }
}

export default { getUserInfo }