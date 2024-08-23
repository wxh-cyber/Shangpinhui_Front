<template>
  <div>
    <Header></Header>
    <!--路由组件出口的地方-->
    <router-view></router-view>
    <!--在Home、Search显示的，在登录、注册时隐藏-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      msg: "abc",
    };
  },
  mounted() {
    //通知Vuex发送请求，获取数据，存储于仓库之中
    //该请求放置在根组件中，因此只会被执行一次
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>