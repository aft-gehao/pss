$(function () {
    loadMenu();
    //点击退出跳转到登录页面
    $('#loginOut').click(function () {
        login_out();
    });
});
function  loadMenu() {
    BUI.use('common/main',function(){
        //获取json
        $.getJSON('/passport/load_menus',function(data){
            if(data["result"] =="success") {
                var html ="";
                var appendMenu = eval(data["append_ext2"]);
                for (var i = 0; i < appendMenu.length; i++) {
                    html+='<li class="nav-item dl-selected">';
                    html+='<div class="nav-item-inner nav-home">'+appendMenu[i]["menu_name"]+'</div>';
                    html+='</li>';
                }
                $("#J_Nav").html(html);
                var config = eval("[" + data["append"] + "]");
                
                new PageUtil.MainPage({
                    modulesConfig: config
                });
                $("#user_name").html(data["append_ext"]);
            }else{
                layer.msg(data["message"]);
            }
        });
    });
}
function login_out() {
    $.ajax({
        type: 'POST',
        url: "/passport/login_out",
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                    window.location.href = data['target'];
            }
        }
    });
}