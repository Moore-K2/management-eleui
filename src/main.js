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
    TableColumn

} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/less/index.css"


import router from "./router/index.js"
import store from "./store/index.js"
import http from "axios" //全局引入axios. 它不是插件
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

Vue.prototype.$http = http //设置全局变量，这样$http就在所有的Vue实例中可以用。$是避免与已被定义的数据冲突

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')