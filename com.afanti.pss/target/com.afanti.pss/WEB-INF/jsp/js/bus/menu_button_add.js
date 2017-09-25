var menu_id = "",  menu_url="";
$(function () {
    menu_id = $.alle_getUrlParam("menu_id");
    $("#add_menu_sumbit").click(function () {
        add_menu_sumbit();
    })
    $("#menu_back").click(function () {
            parent.hideRightMenu();
            $.alle_dialog_close();
    })
})

function add_menu_sumbit()
{
    var menu_name = $("#menu_name").val();
    var menu_url = $("#menu_url").val();
    if(menu_name==null || ""==menu_name)
    {
        layer.msg("请输入按钮名称");
        return false;
    }
    if(menu_url==null || ""==menu_url)
    {
        layer.msg("请输入按钮ID");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/user/manager/add_menu",
        data: {
            menu_parent:menu_id,
            menu_name: menu_name,
            menu_url:menu_url,
            menu_type:1
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

