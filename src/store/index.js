import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex) //插件使用

// tab按键实现aside是否展开
import tab from "./tab.js"
import user from "./user.js"


export default new Vuex.Store({
    modules: {
        tab: tab,
        user
    }
})