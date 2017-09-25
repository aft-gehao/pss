var menu_id = "", role_id = "",isFlag = false, menu_url="";
$(function () {
    tip_msg("如果不填写url,表示添加目录。","#menu_url");
    menu_id = $.alle_getUrlParam("menu_id");
    role_id = $.alle_getUrlParam("role_id");
    //是否需要填写url
    // load_menu_url();
    $("#add_menu_sumbit").click(function () {
        add_menu_sumbit();
    })
    $("#menu_back").click(function () {
            parent.hideRightMenu();
            $.alle_dialog_close();
    })
})
// function load_menu_url() {
//     $.ajax({
//         type: 'POST',
//         url: "/user/manager/check_menu_url",
//         data: {
//             menu_parent: menu_id
//         },
//         dataType: "json",
//         success: function (data) {
//             if (data["result"] == "success") {
//                 isFlag = data["append"];
//                 if (isFlag) {
//                     $("#menu_url").removeAttr("disabled");
//                 } else {
//                     $("#menu_url").attr("disabled", "disabled");
//                 }
//             } else {
//                 layer.msg(data["message"]);
//             }
//         }
//     });
// }

function add_menu_sumbit()
{
    var menu_name = $("#menu_name").val();
    var menu_url = $("#menu_url").val();
    if(menu_name==null || ""==menu_name)
    {
        layer.msg("请输入菜单名称");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/user/manager/add_menu",
        data: {
            role_id:role_id,
            menu_parent:menu_id,
            menu_name: menu_name,
            menu_url:menu_url
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    parent.loadRoleMenu();
                    $.alle_dialog_close();
                }, 1000);
            }
        }
    });
}

