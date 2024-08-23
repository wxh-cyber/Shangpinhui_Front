//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
//引入store
import store from '@/store/index';

//使用插件
Vue.use(VueRouter);

//先把VueRouter原型对象的push和replace，分别保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace
//第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
//第二个参数：成功回调
//第三个参数：失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call和apply的区别
        //相同点：都可以调用函数一次，都可以纂改函数的上下文一次
        //不同点：call与apply传递参数:call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject);
    }
    else {
        originPush.call(this, location, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    }
    else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //返回的y:0，代表在滚动条最上方
        return { y: 0 }
    }
});

//全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    //to:可以获取到的要跳转的路由信息
    //from:获取到从哪个路由而来的信息
    //next：放行函数     next()放行    next(path)放行到指令路由
    //用户登录了，才会有Token，未登录一定不会有Token
    let token = store.state.User.token;
    //用户信息
    let name = store.state.User.userInfo.name;
    if (token) {   //用户已经登录了，不能再跳转到login
        if (to.path == '/login' || to.path == '/register') {
            next('/home');
        } else {     //登录了，但是去的不是login【home|search|detail|shopcart】
            if (name) {    //如果已有用户信息
                next();
            } else {   //没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    //放行
                    next();
                } catch (error) {
                    //token失效了，获取不到用户的信息，重新登录
                    //清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        //未登录：不能去交易相关，不能去支付相关【pay|paysuccess】，不能去个人中心
        //未登录去的路由---登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录的时候想去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect=' + toPath);
        } else {
            next();
        }

    }
})

export default router;