$(function () {
    // $('#link_reg').click(function () {
    //     $('.login_box').hide();
    //     $('.reg_box').show();
    // })
    // $('#link_login').click(function () {
    //     $('.login_box').show();
    //     $('.reg_box').hide();
    // })
    $('#link_reg').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    })
    $('#link_login').on('click', function () {
        $('.login_box').show();
        $('.reg_box').hide();
    })
    //表单校验
    //自定义表单验证属性
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if (value != $('.reg_box [name=password]').val()) {
                return '两次输入密码不一致！';
            }
        }
    })
    //注册功能实现
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $('#form_reg').serialize(),
            success: function (res) {
                if (res.status != 0) {
                    layer.msg(res.message);
                } else {
                    layer.msg('注册成功，请登录！')
                    //触发a标签单击事件切换到登录表单
                    $('#link_login').click();
                    $('#form_reg')[0].reset();
                }
            }
        })
    })
    //登录功能实现
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    layer.msg(res.message);
                } else {
                    layer.msg('登录成功！');
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html';
                }
            }
        })
    })
})