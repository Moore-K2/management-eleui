export default {
    // 开启命名空间，便于使用...mapState等
    namespace: true,
    state: {
        // 默认展开
        isCollapse: false
    },
    actions: {},
    mutations: {
        HandelCollapse(state) {
            state.isCollapse = !state.isCollapse
        }
    }

}