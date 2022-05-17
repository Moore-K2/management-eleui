import Vue from 'vue'
import App from './App.vue'
// 按需引入
import {
    Button,
    Row,
    Radio,
    Container,
    Aside,
    Header,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Col,
    Card,
    Table,
    TableColumn,
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Form,
    FormItem,
    Input,
    Select,
    Checkbox,
    Switch,
    DatePicker,
    TimePicker,
    Dialog,
    Option,
    Pagination,
    MessageBox,
    Message,
    Footer


} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/less/index.css"


import router from "./router/index.js"
import store from "./store/index.js"
import http from "axios" //全局引入axios. 它不是插件
import "../api/mock.js" //对Mock进行引用
// 避免生产提示错误
Vue.config.productionTip = false

// 按需使用
Vue.use(Button)
Vue.use(Row)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Checkbox)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Footer)

Vue.prototype.$http = http //设置全局变量，这样$http就在所有的Vue实例中可以用。$是避免与已被定义的数据冲突
Vue.prototype.$confirm = MessageBox.confirm // 绑定messagebox的confirm到全局上
Vue.prototype.$message = Message // 绑定message到全局上

// 设置全局导航守卫---初始化时执行、每次路由切换前执行
router.beforeEach((to, from, next) => {
    // 拿到token,防止token丢失
    store.commit('getToken')
    const token = store.state.user.token
        // 若token不存在且当前页面不是登录页，则跳转到登录页。否则放行
    if (!token && to.name !== 'login') {
        next({ name: 'login' }) // 返回到登录页
    } else if (token && to.name === 'login') {
        next({
            name: 'home'
        })
    } else {
        // 登陆成功则放行
        next()
    }
})

new Vue({
    render: h => h(App),
    router,
    store,
    // 防止刷新白屏
    created() {
        store.commit('addMenu', router)
    }
}).$mount('#app')