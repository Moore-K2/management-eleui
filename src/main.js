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
    Pagination

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

Vue.prototype.$http = http //设置全局变量，这样$http就在所有的Vue实例中可以用。$是避免与已被定义的数据冲突

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')