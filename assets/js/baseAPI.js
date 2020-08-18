//拦截所有ajax请求
$.ajaxPrefilter(function (params) {
    params.url = 'http://ajax.frontend.itheima.net' + params.url
})