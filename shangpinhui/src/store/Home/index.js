//Home模块的小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";

const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {   //解构commit，将上下文对象中的commit属性取出，赋值给同名变量commit，下面直接调用
        let result = await reqCategoryList();
        //console.log(result);    //返回状态码code和对应的数据
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data);   //返回的data是一个数组
        }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        //console.log(result);
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data);
        }
    },
    //获取Floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            //提交mutation
            commit('GETFLOORLIST', result.data);
        }
    }
};

const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};

const state = {
    //state中的对象初始化形式和服务器返回对象有关，服务器返回对象则为对象，服务器返回数组则为数组【根据接口的返回值进行初始化】
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor组件的数据
    floorList: []
};

//计算属性
const getters = {};

export default {
    actions,
    mutations,
    state,
    getters
}