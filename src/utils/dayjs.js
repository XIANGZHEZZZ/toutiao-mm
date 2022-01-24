import Vue from 'vue'

import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn' // ES 2015 中文语言包 

// 这里我们使用的是 ES6 语法
import relativeTime from 'dayjs/plugin/relativeTime'
// var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用
/**
 *  定义一个全局过滤器，然后就可以在任何组件的模版中使用
 *  import Vue from 'vue'
 *  Vue.filter('参数1', 参数2 => {})
    其实过滤器就相当于一个全局可用的方法 （仅供模版使用）
    参数1 过滤器名称
    参数2 过滤器函数
    Vue.filter('relativeTime', value => {})
    使用方法 {{表达式 | 过滤器名称}}
    <span>{{article.pubdate | relativeTime}}</span>
    管道符 | 前面的表达的结果会作为参数传递到过滤器函数中
    过滤器的返回值会渲染到使用过滤器的模版位置
 */

Vue.filter('relativeTime', value => {
    // console.log(value);
    return dayjs().to(dayjs(value))
})
// dayjs () 获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'));
// console.log(dayjs().to(dayjs('1990-01-01')));
// dayjs().from(dayjs('1990-01-01')) // 31 年后
// dayjs().from(dayjs('1990-01-01'), true) // 31 年
// dayjs().fromNow()

// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()