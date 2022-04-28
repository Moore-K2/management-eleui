import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

// tab按键实现aside是否展开
import tab from "./tab.js"

export default new Vuex.Store({
    modules: {
        tab: tab
    }
})