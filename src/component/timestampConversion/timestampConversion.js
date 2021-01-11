import React from 'react'
// 时间戳转换
Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth() + 1,// month
        "d+" : this.getDate(),// day
        "h+" : this.getHours(),// hour
        "m+" : this.getMinutes(),// minute
        "s+" : this.getSeconds(),// second
        "q+" : Math.floor((this.getMonth() + 3) / 3),// quarter
        "S" : this.getMilliseconds()
        // millisecond
    };
    if (/(y+)/.test(format) || /(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
export default class TimestampConversion extends React.Component {
    render() {
        const time = this.props.publishTime
        const year = parseInt(new Date(time).format("yyyy-MM-dd hh:mm").split(" ")[0].split("-")[0])
        const month = parseInt(new Date(time).format("yyyy-MM-dd hh:mm").split(" ")[0].split("-")[1])
        const day = parseInt(new Date(time).format("yyyy-MM-dd hh:mm").split(" ")[0].split("-")[2])
        const hour = parseInt(new Date(time).format("yyyy-MM-dd hh:mm").split(" ")[1].split(":")[0])
        const minute = parseInt(new Date(time).format("yyyy-MM-dd hh:mm").split(" ")[1].split(":")[1])
        if( year < new Date().getFullYear() ){
            // return new Date(sendTime).format("yyyy-MM-dd hh:mm") + ' 发布'
            return new Date(time).format("yyyy-MM-dd") + ' 发布'
        }
        if( month < new Date().getMonth() + 1 ){
            return new Date(time).format("MM-dd hh:mm") + ' 发布'
        }
        // if( chatDay+2 === new Date().getDate()){
        //     return "前天 " + new Date(sendTime).format("hh:mm")
        //
        // }
        if( day+1 === new Date().getDate()){
            return "昨天 " + new Date(time).format("hh:mm") + ' 发布'
        }
        if( day < new Date().getDate()){
            return new Date(time).format("MM-dd hh:mm") + ' 发布'
        }
        // 当天发布
        if( day === new Date().getDate()){
            // return new Date(sendTime).format("hh:mm")
            if(hour < new Date().getHours()){
                return new Date().getHours() - hour  + '小时前 发布'
            }
            if(hour === new Date().getHours()){
                if(minute === new Date() .getMinutes()){
                    return '刚刚发布'
                }else{
                    return new Date() .getMinutes() - minute  + '分钟前 发布'
                }
            }
        }
    }
}