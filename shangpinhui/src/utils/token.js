//对外暴露一个函数
//存储Token
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token);
};
//获取Token
export const getToken = () => {
    return localStorage.getItem('TOKEN');
};
//清除本地存储的Token
export const removeToken = () => {
    return localStorage.removeItem('TOKEN');
};