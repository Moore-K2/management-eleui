import Vue from 'vue'
import VueRouter from "vue-router"
// 引入组件(还可以按需引入)
// import Home from "../views/Main.vue"
// import User from "../views/User.vue"
// 全局引入
Vue.use(VueRouter)

// 避免Avoided redundant navigation to current location: "/xxx"
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [{
        path: '/',
        name: 'Main',
        redirect: 'home', // 路由重定向-跳转到主页
        // component: Home
        component: () =>
            import ("../views/Main.vue"),
        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: () =>
            //         import ("../views/home/Home.vue")
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: () =>
            //         import ("../views/user/User.vue")
            // },
            // {
            //     path: '/mall',
            //     name: 'mall',
            //     component: () =>
            //         import ("../views/mall/Mall.vue")
            // },
            // {
            //     path: '/page1',
            //     name: 'page1',
            //     component: () =>
            //         import ("../views/other/PageOne.vue")
            // },
            // {
            //     path: '/page2',
            //     name: 'page2',
            //     component: () =>
            //         import ("../views/other/PageTwo.vue")
            // }
        ]
    },
    // 设置login的路由
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/Login.vue')

    }
]

// 创建router实例对象路由器
const router = new VueRouter({
    mode: "history",
    routes
})

export default router