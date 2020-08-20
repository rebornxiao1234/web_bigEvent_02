$(function () {
    getUserInfo();
    //退出功能实现
    $('#logout_Btn').on('click', function () {
        console.log('ok');
        layer.confirm('确定要退出吗?', { icon: 3, title: '退出' }, function (index) {
            location.href = '/login.html';
            localStorage.removeItem('token');
            layer.close(index);
        });
    })
    //控制用户访问权限
})
var layer = layui.layer;
//获取用户基本信息
function getUserInfo() {
    //发送ajax
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // console.log(res.data);
            renderAvatar(res.data);
        },
    })
}
// 渲染用户信息
function renderAvatar(user) {
    //获取用户名称，判断是否有昵称，优先显示
    var name = user.nickname || user.username;
    //渲染用户名
    $('.welcome').html('欢迎您&nbsp;&nbsp;' + name);
    //判断是否有头像，没有头像显示文字头像
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase())
        $('.text-avatar').show();
    }
}
