$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6位之间！'
            }
        }
    })
    getUser();
    //发送ajax获取用户信息
    function getUser() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //渲染页面
                render(res.data);

            }
        })
    }
    // 渲染页面函数
    function render(data) {
        form.val('user_info', data);
    }
    // 给提交修改按钮绑定事件,需要给表单直接绑定提交事件
    $('#user_info').on('submit', function (e) {
        e.preventDefault();
        var fd = $(this).serialize();
        //发送ajax提交数据
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: fd,
            success: function (res) {
                if (res.status) {
                    return layer.msg(res.message);
                }
                layer.msg('修改用户信息成功');
            }
        })
    })
    //给重置按钮绑定事件
    $('#reset').on('click', function (e) {
        e.preventDefault();
        getUser();
    })

})