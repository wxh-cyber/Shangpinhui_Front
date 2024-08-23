//登录与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken, getToken, removeToken } from '@/utils/token';

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //清除本地数据
    CLEAR(state) {
        //先将仓库中的用户信息清空
        state.token = '';
        state.userInfo = {};
        //本地存储数据清空
        removeToken();
    }
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //获取验证码的这个接口，将验证码返回。正常情况，后台将验证码发送到用户手机上。
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //用户注册
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //登录业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        //服务器下发的token，是用户的唯一标识符(uuid)
        //将来经常通过带token找服务器要用户的信息进行展示
        if (result.code == 200) {
            //用户已经登陆成功且获取到了token
            commit('USERLOGIN', result.data.token);
            //本地持久化存储token
            setToken(result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            //提交用户信息
            commit('GETUSERINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //退出登录
    async userLogout({ commit }) {
        //只是向服务器发起一次请求，通知服务器清除Token
        let result = await reqLogout();
        //action不能操作state，提交mutation修改state
        if (result.code == 200) {
            commit('CLEAR');
        } else {
            return Promise.reject(new Error('faile'));
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}