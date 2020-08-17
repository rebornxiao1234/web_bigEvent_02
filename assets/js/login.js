$(function () {
    // 点击去注册事件注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 单击去登陆事件注册
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
})