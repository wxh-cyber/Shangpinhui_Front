import Vue from 'vue';
import App from './App.vue';
//引入路由
import router from '@/router';
//测试
import { reqCategoryList } from '@/api';
reqCategoryList();
//三级联动组件-全局组件
import TypeNav from '@/components/TypeNav/index.vue';
//第一个参数：全局组件的名字
//第二个参数：具体的组件
Vue.component(TypeNav.name, TypeNav);

//将轮播图注册为全局组件
import Carousel from '@/components/Carousel/index.vue';
Vue.component(Carousel.name, Carousel);

import Pagination from '@/components/Pagination/index.vue';
Vue.component(Pagination.name, Pagination);

//引入仓库
import store from '@/store/index.js';
//在main.js中引入，可以全局使用
import 'swiper/css/swiper.css';

Vue.config.productionTip = false;

//引入mockServe.js---虚拟数据
import '@/mock/mockServe';

import { reqGetSearchInfo } from '@/api';
console.log(reqGetSearchInfo({}));

//统一接口api文件夹中的全部请求函数
//统一引入
import * as API from '@/api';

import { Button, Loading, MessageBox } from 'element-ui';
//注册全局组件
Vue.component(Button.name, Button);
//Element-ui注册组件，也可挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入懒加载插件
import VueLazyload from 'vue-lazyload';
//引入默认的懒加载背景图
import jiazai from '@/assets/loading.gif';
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: jiazai
});

//引入自定义插件
// import myPlugins from '@/plugins/myPlugin';
// Vue.use(myPlugins, {
//   name: 'upper'   //确认指令名为upper(不需要v-前缀)
// });

//引入表单校验插件
import '@/plugins/validate';

new Vue({
  render: h => h(App),
  //全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由：底下的写法是key-value一致，省略value
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route，$router属性
  router,
  //注册仓库：组件实例的身上会多出一个属性，即$store属性
  store
}).$mount('#app')
