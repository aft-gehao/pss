var menu_id = "", url = "";
$(function () {
    menu_id = $.alle_getUrlParam("menu_id");
    url = $.alle_getUrlParam("url");
    load_menu_info();
    $("#upd_menu_sumbit").click(function () {
        upd_menu_save();
    })
    $("#menu_back").click(function () {
        parent.hideRightMenu();
        $.alle_dialog_close();
    })
})

function upd_menu_save() {
    var menu_name = $("#menu_name").val();
    var menu_id = $("#menu_id").val();
    var menu_url = $("#menu_url").val();
    if (menu_name == null || "" == menu_name) {
        layer.msg("请输入菜单名称");
        return false;
    }
    if (url != null && url != "") {
        if (menu_url == null || menu_url == "") {
            layer.msg("请输入菜单链接");
            return false;
        }
    }
    $.ajax({
        type: 'POST',
        url: "/user/manager/upd_menu_save",
        data: {
            menu_id: menu_id,
            menu_name: menu_name,
            menu_url: menu_url
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
function load_menu_info() {
    $.ajax({
        type: 'POST',
        url: "/user/manager/load_menu_info",
        data: {
            menu_id: menu_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#menu_id").val(data["append"]["menu_id"]);
                $("#menu_name").val(data["append"]["menu_name"]);
                var menu_url = data["append"]["menu_url"];
                if (menu_url != null && menu_url != "") {
                    $("#menu_url").val(data["append"]["menu_url"]);
                    $("#menu_url").removeAttr("disabled");
                } else {
                    $("#menu_url").attr("disabled", "disabled");
                }
            }
        }
    });
}