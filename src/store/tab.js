import Cookie from 'js-cookie'
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
        //高亮所处 的当前菜单
        currentmenu: null,

        // 权限管理
        menu: []
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
        },
        // 实现面包屑下面的标签删除
        closeMenu(state, valTag) {
            // 找到tag对象所在的索引
            const index = state.tabsList.findIndex(item => item.name === valTag.name)
                // 用splice(位置，删除个数)执行删除
            state.tabsList.splice(index, 1)
        },

        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
                // 数据进行处理
            const menuArray = []
                // 此时拿到的menu是permission下的menu
            menu.forEach(item => {
                if (item.children) {
                    // 给item添加数据
                    item.children = item.children.map(item => {
                            item.component = () =>
                                import (`../views/${item.url}`)
                            return item
                        })
                        // 将二维数组扁平化
                    menuArray.push(...item.children)
                } else {
                    item.component = () =>
                        import (`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}