$(function () {
    var form = layui.form;
    var layer = layui.layer;
    //表单验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            if (value === $('.layui-form-item [name=oldPwd]').val()) {
                return '新密码和原密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('.layui-form-item [name=newPwd]').val()) {
                return '两次密码输入不一致！'
            }
        }
    })
    //为表单添加提交事件
    $('#user_pwd').on('submit', function (e) {
        e.preventDefault();
        // 获取表单数据
        var fd = $(this).serialize();
        alert(fd)
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                layer.msg('修改密码成功！');
                //重置表单
                // console.dir($('#user_pwd')[0])
                $('#user_pwd')[0].reset();
            }
        })
    })
})