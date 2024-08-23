//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from './mockRequest';

//三级联动接口
///product/getBaseCategoryList  get  无参数
//axios发请求返回结果是Promise对象
export const reqCategoryList = () => {
  //发请求
  return requests({ url: '/product/getBaseCategoryList', method: 'get' });
}

//获取Banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner');

//获取Floor数据
export const reqFloorList = () => mockRequests.get('/floor');

//获取搜索模块数据  地址：/api/list  请求方式：POST  参数：需要带参数
/**
 * {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
//当前这个函数需要接收外部参数
//当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'POST', data: params });

//获取产品详情信息的接口   URL：/api/item/{skuId}   请求方式：get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'GET' });

//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{skuId}/{skuNum}    请求方式：POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' });

//获取购物车列表的数据接口
//URL:/api/cart/cartList   method:get
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'GET' });

//删除购物产品的接口
//URL:/api/cart/deleteCart/{skuId}    请求方式：DELETE   
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' });

//修改商品的选中状态
//URL:/api/cart/checkCart/{skuid}/{isChecked}    请求方式：get
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' });

//获取验证码
//URL:/api/user/passport/sendCode/{phone}     请求方式：get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' });

//注册
//URL:/api/user/passport/register    请求方式：post   参数：phone  code  passport
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'POST' });

//登录
//URL:/api/user/passport/login     请求方式：post    参数：phone password
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'POST' });

//获取用户信息【需要带着用户的token向服务器获取用户信息】
//URL:/api/user/passport/auth/getUserInfo       请求方式：get
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'GET' });

//退出登录
//URL:/api/user/passport/logout      请求方式：get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'GET' });

//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList   请求方式：get
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'GET' });

//获取商品清单
//URL:/api/order/auth/trade        请求方式：get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'GET' });

//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}    请求方式：post
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'POST' });

//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}    请求方式：get
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' });

//获取支付订单状态
// URL:/api/payment/weixin/queryPayStatus/{orderId}    请求方式：get
//向真实服务器发送请求
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' });
//向mock服务器发送请求
// export const reqPayStatus = (orderId) => mockRequests({
//   url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET'
// });

//获取个人中心的数据
//URL:/api/order/auth/{page}/{limit}    请求方式：get
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'GET' });

