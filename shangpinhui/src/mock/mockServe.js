//引入mockjs数据
import Mock from 'mockjs';
//把JSON数据格式引入进来[JSON数据格式根本没有对外暴露，但是可以引入]
//ES6语法特性：图片、JSON数据格式默认对外暴露
import banner from './banner.json';
import floor from './floor.json';
import payment from './payment.json';
//console.log(1);


//mock数据：第一个参数：请求地址   第二个参数：请求数据
Mock.mock('/mock/banner', { code: 200, data: banner });   //模拟首页轮播图的数据
Mock.mock('/mock/floor', { code: 200, data: floor });
// Mock.mock(`/mock/payment/weixin/queryPayStatus/${orderId}`, { code: 200, data: payment });
// Mock.mock(`/\/mock\/payment\/weixin\/queryPayStatus/${orderId}/`, 'get', (options) => {
//     console.log(options);
//     console.log(options.query);
//     return {
//         code: 200,
//         data: payment
//     }
// });

//根据url获取query参数
const getQuery = (url, name) => {
    const index = url.indexOf('?');
    if (index !== -1) {
        const queryStrArr = url.substr(index + 1).split('&');

        for (var i = 0; i < queryStrArr.length; i++) {
            const itemArr = queryStrArr[i].split('=');
            if (itemArr[0] == name) {
                return itemArr[1];
            }
        }
    }
    return null;
}