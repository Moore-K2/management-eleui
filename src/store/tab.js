export default {
    // 开启命名空间，便于使用...mapState等
    // namespaced: true,
    state: {
        // 默认展开
        isCollapse: false,
        // 初始面包屑的list,默认为home/首页
        // path是自己定义的，在route-link中引用的！在编程式路由，可以this.$router.push{name:"name"}实现跳转
        tabsList: [{
            path: '/home',
            name: "home",
            label: "首页",
            icon: 's-home',
        }],
        //高亮所处的当前菜单
        currentmenu: null
    },
    actions: {},
    mutations: {
        HandelCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
        //实现面包屑
        selectMenu(state, valItem) {
            // 若点击的菜单不是首页
            if (valItem.name !== "home") {
                state.currentmenu = valItem
                    // 检验当前面包屑是中否已存在该菜单的name
                const r = state.tabsList.findIndex(item => item.name === valItem.name)
                if (r === -1) {
                    state.tabsList.push(valItem)
                }
            } else {
                // 若点击的菜单是首页.则重置面包屑
                state.currentmenu = null
            }
        }

    }

}