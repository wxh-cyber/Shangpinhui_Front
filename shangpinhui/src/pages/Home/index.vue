<template>
  <div>
    <!--三级联动全局组件：三级联动已经注册为全局组件因此不需要再引入。-->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!--v-for也可用于多个组件进行循环遍历-->
    <!--Floor组件，自己在组件内部是没有发请求的，数据是父组件给的-->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from "@/pages/Home/ListContainer/index.vue";
import Recommend from "@/pages/Home/Recommend/index.vue";
import Rank from "@/pages/Home/Rank/index.vue";
import Like from "@/pages/Home/Like/index.vue";
import Floor from "@/pages/Home/Floor/index.vue";
import Brand from "@/pages/Home/Brand/index.vue";

import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState(["count"]),

    ...mapState({
      floorList: (state) => state.Home.floorList,
    }),
  },
  mounted() {
    //派发action，获取Floor组件的数据
    this.$store.dispatch("getFloorList");
    //获取用户信息在首页进行展示
    this.$store.dispatch("getUserInfo");
  },
};
</script>

<style scoped>
</style>