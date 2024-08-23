//Vue插件一定暴露一个对象
let myPlugins = {};

//第一个参数：Vue实例   第二个参数：传递的参数
myPlugins.install = function (Vue, options) {
    //Vue.prototype.$bus：任何组件都可以使用
    //Vue.directive:自定义全局指令
    //Vue.component：全局组件
    //Vue.filter
    Vue.directive(options.name, (element, params) => {
        //第一个参数element：指令作用的DOM元素
        //第二个参数params：携带的参数
        console.log('执行');
        element.innerHTML = params.value.toUpperCase();
    });
}

export default myPlugins;