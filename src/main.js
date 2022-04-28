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


} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/less/index.css"


import router from "./router/index.js"
import store from "./store/index.js"
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

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')