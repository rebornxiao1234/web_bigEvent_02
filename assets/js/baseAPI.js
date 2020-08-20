//拦截所有ajax请求
$.ajaxPrefilter(function (params) {
    params.url = 'http://ajax.frontend.itheima.net' + params.url
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    //统一挂载complete函数
    params.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})