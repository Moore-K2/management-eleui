1 创建项目

vue create xxx

2 进入项目目录，进行npm run serve就可启动项目

3 打包项目: npm run build

4 element-ui按需引入:

​	先npm install babel-plugin-component -D，安装后在babel.config.js上添加配置文件：

```javascript
# element-ui按需使用
import {Button,Row,Radio} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Button)
Vue.use(Row)
Vue.use(Radio)
```



```javascript
module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
```

5 路由传参：

**what?** 通过路由传递参数

**why?**传一个参数过去，然后调后端接口，后端根据参数 查询到结果 返回到前端，前端做渲染。

**how？**两种方式，1：路径传参   2：props传参

1**-路径传参**，在routes的path里面添加占位符， 例如

2-**props传参**，在routes的path里面添加占位符， 再用:to绑定

```javascript
<router-link :to{name:'main' params:{id:3}} ></router-link>
用this.$route.params.id获取传递进来的参数值
```

