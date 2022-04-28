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
    // component: Home
    component: () =>
        import ("../views/Main.vue"),
    children: [{
            path: '/home',
            name: 'home',
            component: () =>
                import ("../views/home/Home.vue")
        },
        {
            path: '/user',
            name: 'user',
            component: () =>
                import ("../views/user/User.vue")
        }
    ]
}]

// 创建router实例对象路由器
const router = new VueRouter({
    mode: "history",
    routes
})

export default router