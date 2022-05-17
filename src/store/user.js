import Cookies from 'js-cookie'

//name为user这个字段了，而它的value是咸蛋君,从现在起3天过期的cookie
// Cookies.set('user', '咸蛋君', { expires: 3, path: '' });

export default {
    state: {
        token: '',
    },
    mutations: {
        setToken(state, val) {
            state.token = val
            Cookies.set('token', val) // 将token进行缓存
        },
        clearToken(state) {
            state.token = '' // 为什么要这一行？？？ 清空token值
            Cookies.remove('token')
        },
        getToken(state) {
            // 若当前缓存有token,则直接获取。若没有则从state中获取|
            state.token = state.token || Cookies.get('token')
        }
    }
}