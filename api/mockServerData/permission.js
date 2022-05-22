import Mock from 'mockjs'

export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
            // 先判断用户是否存在
            // 判断账号和密码是否对应
        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [{
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            meta: { title: '首页' },
                            url: 'home/Home.vue'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'video-play',
                            meta: { title: '商品管理' },
                            url: 'mall/Mall.vue'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            meta: { title: '用户管理' },
                            url: 'user/User.vue'
                        },
                        {
                            label: '其他',
                            name: 'other',
                            icon: 'location',
                            meta: { title: '其他' },
                            children: [{
                                    path: '/page1',
                                    name: 'page1',
                                    label: '页面1',
                                    icon: 'setting',
                                    meta: { title: '摩尔' },
                                    url: 'other/PageOne.vue'
                                },
                                {
                                    path: '/page2',
                                    name: 'page2',
                                    label: '页面2',
                                    icon: 'setting',
                                    meta: { title: '摩尔' },
                                    url: 'other/PageTwo.vue'
                                }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'user' && password === 'user') {
            return {
                code: 20000,
                data: {
                    menu: [{
                            // path: '/home/:name',
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            meta: { title: '首页' },
                            url: 'home/index'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'video-play',
                            meta: { title: '商品管理' },
                            url: 'mall/index'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                }
            }
        }

    }
}