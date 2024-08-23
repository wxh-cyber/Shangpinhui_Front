//Search模块的小仓库
import { reqGetSearchInfo } from "@/api";

const actions = {
    //获取Search模块数据
    async getSearchList({ commit }, params = {}) {    //设置params默认参数为空对象
        //函数在调用获取服务器数据时，至少传递一个参数（空对象）
        //params参数：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const state = {
    //仓库初始状态
    searchList: {}
};
//计算属性：在项目中为了简化数据而生
//项目当中getters主要的作用是：简化仓库中的数据
const getters = {
    //形参state:当前仓库中的state，并非大仓库中的state
    //特殊地，当无法正常发送接收网络请求时，searchList为空对象，此时将不存在下列属性
    //假如网络不给力|[没有网]，应该返回的是undefined
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    }
};

export default {
    actions,
    mutations,
    state,
    getters
}