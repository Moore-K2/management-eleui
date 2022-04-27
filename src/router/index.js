import Vue from 'vue'
import VueRouter from "vue-router"
// 引入组件
import Home from "../views/Home.vue"
import User from "../views/User.vue"
// 全局引入
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
        // component: () =>
        //     import (".. / views / Home.vue")
}, {
    path: '/user',
    name: 'User',
    component: User

}]

// 创建router实例对象路由器
const router = new VueRouter({
    mode: "history",
    routes
})

export default router