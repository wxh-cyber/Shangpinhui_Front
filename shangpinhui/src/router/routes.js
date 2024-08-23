//引入一级路由组件
//import Home from '@/pages/Home/index.vue';
//import Search from '@/pages/Search/index.vue';
import Login from '@/pages/Login/index.vue';
import Register from '@/pages/Register/index.vue';
import Detail from '@/pages/Detail/index.vue';
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue';
import ShopCart from '@/pages/ShopCart/index.vue';
import Trade from '@/pages/Trade/index.vue';
import Pay from '@/pages/Pay/index.vue';
import PaySuccess from '@/pages/PaySuccess/index.vue';
import Center from '@/pages/Center/index.vue';
//引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder/index.vue';
import GroupOrder from '@/pages/Center/GroupOrder/index.vue';

/**
 * 路由懒加载：
 * 当打包构建应用时，JavaScript包会变得非常大，影响页面加载。
 * 如果能把不同路由对应的组件分割成不同的代码块，当路由被访问时才加载对应的组件，这样就更高效了。
 */

export default [
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        //二级路由组件
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {    //二级路由重定向
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面，必须是从购物车而来
            if (from.path == '/shopcart') {
                next();
            } else {
                //其他的路由组件而来，停留在当前页面
                next(false);
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/home',
        //component: Home,
        component: () => import('@/pages/Home/index.vue'),
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',   //表示params参数可以传递，也可以不传递
        component: () => import('@/pages/Search/index.vue'),
        meta: { show: true },
        name: 'search',
        //路由组件传递props数据
        //布尔值写法：params参数作为路由组件身上的属性
        //props: true
        //对象写法：额外给路由组件传递一些props
        //props:{a:1,b:2}
        //函数写法：可以给params参数、query参数，通过props传递给路由组件
        props: ($route) => {
            return {
                keyword: $route.params.keyword,
                k: $route.query.k
            }
        }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    //重定向，在项目跑起来的时候，访问/，立马定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]